import { PageHero } from "@/components/sections/PageHero";
import { CardSection, Empty } from "@/components/sections/CardGrid";
import { ArrowLink } from "@/components/ui/Button";
import { pageMeta } from "@/lib/meta";
import { getNews } from "@/lib/news";

export const metadata = pageMeta({
  title: "News",
  description: "Recent news from around the school: achievements, trips, classroom stories and more.",
  path: "/news",
});

export default function NewsPage() {
  const { latest, archive } = getNews();
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Life at Oxford, as it happens."
        lede="Small victories and big ones, written up by our teachers, students and parents."
        crumbs={[{ label: "Home", href: "/" }, { label: "News", href: "/news" }]}
      >
        <ArrowLink href="/events">Looking for events? See what is coming up</ArrowLink>
      </PageHero>
      {latest.length ? <CardSection title="Latest news" items={latest} /> : <Empty>No news yet. Please check back soon.</Empty>}
      {archive.length > 0 && (
        <section className="section pt-0">
          <div className="container-x">
            <ArrowLink href="/news/archive">Older articles ({archive.length})</ArrowLink>
          </div>
        </section>
      )}
    </>
  );
}
