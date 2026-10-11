import Link from "next/link";
import { ViewTransition } from "react";
import { PageHero } from "@/components/sections/PageHero";
import { Empty } from "@/components/sections/CardGrid";
import { Photo } from "@/components/media/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/content";
import { pageMeta } from "@/lib/meta";
import { articleHref, getAlbums, topics } from "@/lib/news";

export const metadata = pageMeta({
  title: "Gallery",
  description: "Photographs from school events, trips, sports, classrooms and celebrations.",
  path: "/gallery",
});

export default function GalleryPage() {
  const albums = getAlbums();
  const groups = topics
    .map((t) => ({ topic: t, items: albums.filter((a) => a.topic.value === t.value) }))
    .filter((g) => g.items.length > 0);
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="School life, in pictures."
        lede="Every album is a story from school. Open one to read about the day and see all of its photographs."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery", href: "/gallery" }]}
      />
      {groups.length === 0 && <Empty>Photographs will appear here as events are written up.</Empty>}
      {groups.map((g, i) => (
        <section key={g.topic.value} className={`section ${i % 2 === 1 ? "bg-paper" : ""}`}>
          <div className="container-x">
            <Reveal>
              <SectionHeading title={g.topic.label} />
            </Reveal>
            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((a, j) => (
                <Reveal as="li" key={a.slug} delay={Math.min(j, 5) * 0.08}>
                  <article className="group relative overflow-hidden rounded-3xl border border-sand bg-paper focus-within:ring-2 focus-within:ring-accent">
                    <div className="overflow-hidden">
                      <ViewTransition name={`photo-${a.slug}`} share="morph" default="none">
                        <Photo
                          photo={a.photos[0]}
                          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                        />
                      </ViewTransition>
                    </div>
                    <div className="p-6">
                      <p className="meta-label">
                        {a.photos.length} {a.photos.length === 1 ? "photo" : "photos"}
                        <span className="mx-2 text-sand" aria-hidden="true">/</span>
                        <time dateTime={a.date} className="text-muted normal-case tracking-normal">{formatDate(a.date)}</time>
                      </p>
                      <h3 className="display mt-3 break-words text-[1.4rem] leading-tight">
                        <Link href={articleHref(a)} className="outline-none after:absolute after:inset-0">{a.title}</Link>
                      </h3>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}
