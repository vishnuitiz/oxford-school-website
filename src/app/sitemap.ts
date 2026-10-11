import type { MetadataRoute } from "next";
import { articleHref, getArticles } from "@/lib/news";
import { pages } from "@/lib/pages";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const fixed = ["", "/admissions/enquiry", "/gallery", "/news", "/events", "/contact"];
const legal = new Set(["/privacy-policy", "/terms-of-use", "/accessibility"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...fixed, ...pages.map((p) => p.path)];
  const entries: MetadataRoute.Sitemap = paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: ["", "/news", "/events", "/gallery"].includes(path) ? "weekly" : "monthly",
    priority: path === "" ? 1 : legal.has(path) ? 0.3 : 0.8,
  }));
  const articles: MetadataRoute.Sitemap = getArticles().map((a) => ({
    url: `${site.url}${articleHref(a)}`,
    lastModified: a.date,
    changeFrequency: "yearly",
    priority: 0.5,
  }));
  return [...entries, ...articles];
}
