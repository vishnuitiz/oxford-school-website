import type { Metadata } from "next";
import { site } from "@/lib/site";

// Every public page gets a unique title, description, canonical URL and social tags.
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url: path,
      locale: "en",
    },
  };
}
