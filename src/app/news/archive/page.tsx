import { PageHero } from "@/components/sections/PageHero";
import { CardSection, Empty } from "@/components/sections/CardGrid";
import { pageMeta } from "@/lib/meta";
import { getNews } from "@/lib/news";

export const metadata = pageMeta({
  title: "News archive",
  description: "Older news articles from the school.",
  path: "/news/archive",
});

export default function NewsArchivePage() {
  const { archive } = getNews();
  return (
    <>
      <PageHero
        eyebrow="Archive"
        title="Older news."
        crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }, { label: "Archive", href: "/news/archive" }]}
      />
      {archive.length ? <CardSection title="Earlier articles" items={archive} /> : <Empty>Nothing in the archive yet.</Empty>}
    </>
  );
}
