import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/sections/ArticleView";
import { articleHref, getArticles } from "@/lib/news";
import { pageMeta } from "@/lib/meta";

export const dynamicParams = false;

const items = () => getArticles().filter((a) => a.category === "Event");

export function generateStaticParams() {
  const all = items();
  // Static export needs at least one route; "none" renders the 404 page.
  return all.length ? all.map((a) => ({ slug: a.slug })) : [{ slug: "none" }];
}

async function find(params: Promise<{ slug: string }>) {
  const { slug } = await params;
  return items().find((a) => a.slug === slug);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = await find(params);
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.excerpt, path: articleHref(a) });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const a = await find(params);
  if (!a) notFound();
  return <ArticleView article={a} />;
}
