// Runs before `next dev` and `next build`.
// 1. Reads the published news sheet (NEWS_CSV_URL) or falls back to placeholder articles.
// 2. Downloads each article's photos, strips metadata, resizes to webp into public/media.
// 3. Writes src/generated/articles.json for the pages to read.
// Any problem with the sheet itself exits non-zero, so the build fails and the host keeps the last good deploy.
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import convert from "heic-convert";
import { sampleArticles, writeSamplePhotos } from "./sample-articles.mjs";
import { parseCsv, parsePhotoCell } from "./lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
for (const f of [".env.local", ".env"]) {
  try { process.loadEnvFile(join(root, f)); } catch { /* file may not exist */ }
}

const MEDIA_DIR = join(root, "public", "media");
const OUT_FILE = join(root, "src", "generated", "articles.json");
const WIDTHS = [480, 960, 1600];
const MAX_BYTES = 20 * 1024 * 1024;
const REQUIRED = ["date", "category", "title", "text"];

const isHeic = (b) => b.length > 12 && b.toString("ascii", 4, 8) === "ftyp" && /^(heic|heix|hevc|hevx)$/.test(b.toString("ascii", 8, 12));

async function processPhoto(url) {
  const key = createHash("sha1").update(url).digest("hex").slice(0, 12);
  const side = join(MEDIA_DIR, `${key}.json`);
  if (existsSync(side)) return { key, ...JSON.parse(readFileSync(side, "utf8")) };
  const res = await fetch(url, { signal: AbortSignal.timeout(30_000), redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length > MAX_BYTES) throw new Error("file larger than 20 MB");
  // iPhone photos are HEIC, which the bundled image library cannot decode: convert to JPEG first.
  const input = isHeic(buf) ? Buffer.from(await convert({ buffer: buf, format: "JPEG", quality: 0.92 })) : buf;
  const img = sharp(input, { failOn: "none" }).rotate();
  const meta = await sharp(await img.clone().toBuffer()).metadata();
  if (!meta.width || !meta.height) throw new Error("not a readable image");
  const widths = WIDTHS.filter((w) => w <= meta.width);
  if (!widths.length) widths.push(meta.width);
  for (const w of widths) {
    await img.clone().resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(join(MEDIA_DIR, `${key}-${w}.webp`));
  }
  const info = { w: meta.width, h: meta.height, widths };
  writeFileSync(side, JSON.stringify(info));
  return { key, ...info };
}

async function loadRows() {
  const url = process.env.NEWS_CSV_URL;
  if (!url) {
    console.log("[prebuild] NEWS_CSV_URL not set: using placeholder articles.");
    return null;
  }
  const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
  if (!res.ok) throw new Error(`News sheet request failed: HTTP ${res.status}`);
  const rows = parseCsv(await res.text());
  const header = (rows[0] ?? []).map((h) => h.trim().toLowerCase());
  const missing = REQUIRED.filter((c) => !header.includes(c));
  if (missing.length) {
    throw new Error(`News sheet is missing columns: ${missing.join(", ")}. Found: ${header.join(", ") || "(empty)"}`);
  }
  const at = (r, name) => {
    const i = header.indexOf(name);
    return i < 0 ? "" : (r[i] ?? "").trim();
  };
  const out = [];
  rows.slice(1).forEach((r, i) => {
    const item = {
      date: at(r, "date"), category: at(r, "category"), topic: at(r, "topic"), title: at(r, "title"),
      author: at(r, "author"), text: at(r, "text"), photos: at(r, "photos"), slug: at(r, "slug"),
    };
    if (!item.date && !item.title && !item.text) return;
    out.push({ ...item, row: i + 2 });
  });
  return out;
}

mkdirSync(MEDIA_DIR, { recursive: true });
mkdirSync(dirname(OUT_FILE), { recursive: true });

let articles;
const sheetRows = await loadRows();
if (!sheetRows) {
  await writeSamplePhotos(MEDIA_DIR, WIDTHS);
  articles = sampleArticles;
} else {
  articles = [];
  for (const r of sheetRows) {
    const photos = [];
    for (const p of parsePhotoCell(r.photos)) {
      try {
        const done = await processPhoto(p.url);
        photos.push({ src: `/media/${done.key}`, w: done.w, h: done.h, widths: done.widths, caption: p.caption });
      } catch (e) {
        console.warn(`[prebuild] Sheet row ${r.row}: photo skipped (${e.message}).`);
      }
    }
    articles.push({ ...r, photos });
  }
}

// Remove media no article refers to, so a removed photo disappears from the next build.
const keep = new Set(articles.flatMap((a) => a.photos.map((p) => p.src.split("/").pop())));
for (const f of readdirSync(MEDIA_DIR)) {
  const key = f.split(/[-.]/)[0];
  if (!keep.has(key)) rmSync(join(MEDIA_DIR, f), { force: true });
}

writeFileSync(OUT_FILE, JSON.stringify(articles, null, 1));
console.log(`[prebuild] ${articles.length} article(s), ${keep.size} photo(s).`);
