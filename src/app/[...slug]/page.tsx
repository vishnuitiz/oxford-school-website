import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "@/components/sections/InfoPage";
import { pageMeta } from "@/lib/meta";
import { getPage, pages } from "@/lib/pages";

export const dynamicParams = false;

// Routes that have their own files (enquiry form page) are not listed here.
const own = new Set(["/admissions/enquiry"]);

export function generateStaticParams() {
  return pages.filter((p) => !own.has(p.path)).map((p) => ({ slug: p.path.split("/").filter(Boolean) }));
}

async function find(params: Promise<{ slug: string[] }>) {
  const { slug } = await params;
  return getPage(`/${slug.join("/")}`);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const page = await find(params);
  if (!page) return {};
  return pageMeta({ title: page.title, description: page.description, path: page.path });
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const page = await find(params);
  if (!page) notFound();
  return <InfoPage page={page} />;
}
