import { PageHero } from "@/components/sections/PageHero";
import { CardSection, Empty } from "@/components/sections/CardGrid";
import { pageMeta } from "@/lib/meta";
import { getEvents } from "@/lib/news";

export const metadata = pageMeta({
  title: "Events archive",
  description: "Older events at the school.",
  path: "/events/archive",
});

export default function EventsArchivePage() {
  const { archive } = getEvents();
  return (
    <>
      <PageHero
        eyebrow="Archive"
        title="Older events."
        crumbs={[{ label: "Home", href: "/" }, { label: "Events", href: "/events" }, { label: "Archive", href: "/events/archive" }]}
      />
      {archive.length ? <CardSection title="Earlier events" items={archive} /> : <Empty>Nothing in the archive yet.</Empty>}
    </>
  );
}
