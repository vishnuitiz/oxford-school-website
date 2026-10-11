import raw from "@/generated/articles.json";

export type Photo = { src: string; w: number; h: number; widths: number[]; caption: string; alt: string };

export type Topic = {
  value: string;
  label: string;
  href?: string;
};

// Order is the order shown on the Gallery page. Topics with an href also feed that Activities page.
export const topics: Topic[] = [
  { value: "Sports", label: "Sports", href: "/activities/sports" },
  { value: "Clubs", label: "Clubs", href: "/activities/clubs" },
  { value: "Arts and culture", label: "Arts and culture", href: "/activities/arts-culture" },
  { value: "Celebrations", label: "Celebrations", href: "/activities/celebrations" },
  { value: "Trips", label: "Trips", href: "/activities/trips" },
  { value: "Community", label: "Community service", href: "/activities/community-service" },
  { value: "Achievements", label: "Achievements", href: "/activities/achievements" },
  { value: "Classroom", label: "In the classroom" },
  { value: "General", label: "School life" },
];

export type Article = {
  slug: string;
  title: string;
  date: string;
  category: "News" | "Event";
  topic: Topic;
  author: string;
  excerpt: string;
  body: string[];
  photos: Photo[];
  tile: 0 | 1 | 2 | 3;
};

type RawArticle = {
  date: string;
  category: string;
  topic: string;
  title: string;
  author: string;
  text: string;
  slug: string;
  row?: number;
  photos: { src: string; w: number; h: number; widths: number[]; caption: string }[];
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

function makeExcerpt(paragraphs: string[]) {
  const text = (paragraphs[0] ?? "").replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 160).replace(/\s+\S*$/, "")}…`;
}

function tileFor(slug: string): Article["tile"] {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (h % 4) as Article["tile"];
}

// Sheets can export a date as a day count (46305 = 2026-10-10) when its cell is not formatted as text.
function fromSheetSerial(value: string) {
  if (!/^\d{5}$/.test(value)) return value;
  return new Date(Date.UTC(1899, 11, 30) + Number(value) * 86_400_000).toISOString().slice(0, 10);
}

function build(): Article[] {
  const seen = new Set<string>();
  const articles: Article[] = [];
  for (const r of raw as RawArticle[]) {
    const date = fromSheetSerial((r.date ?? "").trim());
    const title = (r.title ?? "").trim();
    const text = (r.text ?? "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || !title || !text) {
      console.warn(`[news] Skipped sheet row ${r.row ?? "?"}: needs a yyyy-mm-dd date, a title and text.`);
      continue;
    }
    const base = slugify(r.slug || "") || slugify(title) || "article";
    let slug = base;
    for (let n = 2; seen.has(slug); n++) slug = `${base}-${n}`;
    seen.add(slug);
    const body = text.split(/\r?\n+/).map((p) => p.trim()).filter(Boolean);
    const wanted = (r.topic ?? "").trim().toLowerCase();
    articles.push({
      slug,
      title,
      date,
      category: (r.category ?? "").trim().toLowerCase().startsWith("event") ? "Event" : "News",
      topic: topics.find((t) => t.value.toLowerCase() === wanted || t.label.toLowerCase() === wanted) ?? topics[topics.length - 1],
      author: (r.author ?? "").trim(),
      excerpt: makeExcerpt(body),
      body,
      photos: (r.photos ?? []).map((p, i) => ({
        ...p,
        alt: p.caption || `${title}: photo ${i + 1}`,
      })),
      tile: tileFor(slug),
    });
  }
  return articles;
}

const all = build();

export const LIMITS = { home: 3, news: 20, pastEvents: 12 } as const;

export const articleHref = (a: Pick<Article, "category" | "slug">) =>
  `/${a.category === "Event" ? "events" : "news"}/${a.slug}`;

export function getArticles() {
  return all;
}

const newest = (a: Article, b: Article) => (a.date < b.date ? 1 : -1);

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function getNews() {
  const news = all.filter((a) => a.category === "News").sort(newest);
  return { latest: news.slice(0, LIMITS.news), archive: news.slice(LIMITS.news) };
}

export function getEvents() {
  const today = todayIso();
  const events = all.filter((a) => a.category === "Event");
  const upcoming = events.filter((a) => a.date >= today).sort((a, b) => (a.date < b.date ? -1 : 1));
  const past = events.filter((a) => a.date < today).sort(newest);
  return { upcoming, past: past.slice(0, LIMITS.pastEvents), archive: past.slice(LIMITS.pastEvents) };
}

export function getHomeFeed() {
  const { upcoming } = getEvents();
  return [...upcoming, ...getNews().latest].slice(0, LIMITS.home);
}

export function getByTopic(topicValue: string, limit = 6) {
  return all.filter((a) => a.topic.value === topicValue).sort(newest).slice(0, limit);
}

export function getAlbums() {
  return all.filter((a) => a.photos.length > 0).sort(newest);
}
