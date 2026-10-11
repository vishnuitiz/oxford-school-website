import { PageHero } from "@/components/sections/PageHero";
import { CardSection, Empty } from "@/components/sections/CardGrid";
import { ArrowLink } from "@/components/ui/Button";
import { pageMeta } from "@/lib/meta";
import { getEvents } from "@/lib/news";

export const metadata = pageMeta({
  title: "Events",
  description: "Upcoming events at the school, and reports from recent ones.",
  path: "/events",
});

export default function EventsPage() {
  const { upcoming, past, archive } = getEvents();
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="What is coming up, and what you missed."
        lede="Concerts, open mornings, celebrations and exhibitions. Everyone is welcome at the ones marked open."
        crumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }]}
      >
        <ArrowLink href="/news">Read the latest news</ArrowLink>
      </PageHero>
      {upcoming.length === 0 && past.length === 0 && <Empty>No events yet. Please check back soon.</Empty>}
      {upcoming.length > 0 && <CardSection title="Upcoming events" items={upcoming} />}
      {past.length > 0 && <CardSection title="Recent events" items={past} tint={upcoming.length > 0} />}
      {archive.length > 0 && (
        <section className="section pt-0">
          <div className="container-x">
            <ArrowLink href="/events/archive">Older events ({archive.length})</ArrowLink>
          </div>
        </section>
      )}
    </>
  );
}
