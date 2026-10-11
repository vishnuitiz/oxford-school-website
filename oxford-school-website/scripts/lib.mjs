export const MAX_PHOTOS = 12;

export function parseCsv(input) {
  const text = input.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

// Google Drive share links become direct-download links; other https links are used as they are.
export function normalisePhotoUrl(raw) {
  const url = raw.trim();
  // https only; plain http is accepted for localhost so the pipeline can be tested.
  if (!/^https:\/\//i.test(url) && !/^http:\/\/(localhost|127\.0\.0\.1)[:/]/i.test(url)) return null;
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:export=\w+&)?id=)([\w-]{10,})/i);
  return m ? `https://drive.google.com/uc?export=download&id=${m[1]}` : url;
}

export function parsePhotoCell(cell) {
  return cell
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean)
    .flatMap((line) => {
      // "link | caption" is one photo; a line with no "|" may hold several links separated by spaces or commas.
      if (line.includes("|")) {
        const [link, ...rest] = line.split("|");
        return [{ url: normalisePhotoUrl(link), caption: rest.join("|").trim() }];
      }
      return line.split(/[\s,]+/).map((link) => ({ url: normalisePhotoUrl(link), caption: "" }));
    })
    .filter((p) => p.url)
    .slice(0, MAX_PHOTOS);
}

