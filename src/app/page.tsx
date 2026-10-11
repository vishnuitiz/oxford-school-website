import Link from "next/link";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArtTile } from "@/components/illustrations/Illustrations";
import { Sunburst } from "@/components/illustrations/Sunburst";
import { NewsCard } from "@/components/cards/NewsCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Bento } from "@/components/sections/Bento";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { Magnetic } from "@/components/motion/Magnetic";
import { stages } from "@/lib/content";
import { getHomeFeed } from "@/lib/news";
import { cta, site } from "@/lib/site";

const activityLinks = [
  { label: "Sports", href: "/activities/sports" },
  { label: "Clubs", href: "/activities/clubs" },
  { label: "Arts and culture", href: "/activities/arts-culture" },
  { label: "Celebrations", href: "/activities/celebrations" },
  { label: "Trips", href: "/activities/trips" },
  { label: "Community service", href: "/activities/community-service" },
];

export default function Home() {
  const upcoming = getHomeFeed();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden lg:min-h-[calc(100svh-5rem)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent)] md:block">
          <div className="glow -left-24 top-10 size-[26rem] bg-gold/25" />
        </div>
        <Sunburst className="pointer-events-none absolute bottom-28 right-[5vw] h-auto w-[140vw] max-w-none md:bottom-4 md:right-[3vw] lg:-bottom-[3vw] md:w-[min(117vw,1800px)]" />
        <div className="container-x relative pb-64 pt-10 lg:pb-72 lg:pt-16">
          <Reveal immediate>
            <p className="eyebrow">Nursery to Grade 10</p>
          </Reveal>
          <Reveal immediate delay={0.08}>
            <h1 className="display mt-6 max-w-[11em] text-[clamp(2.5rem,5.3vw,4.75rem)] text-ink">
              A school where every child is <em className="text-accent">known</em>.
            </h1>
          </Reveal>
          <Reveal immediate delay={0.16}>
            <p className="lede mt-8">{site.description}</p>
          </Reveal>
          <Reveal immediate delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Magnetic>
                <ButtonLink href={cta.href}>{cta.label}</ButtonLink>
              </Magnetic>
              <ArrowLink href="/academics/curriculum">Our curriculum</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      <Bento />

      {/* Stages */}
      <section className="section bg-sage/60">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Nursery to Grade 10"
              title="A path that grows with your child."
              lede="One school, four stages. Each is gentle about what it asks and generous in what it offers, with no abrupt leaps between them."
            />
          </Reveal>
          <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stages.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 0.08}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-parchment transition-[transform,box-shadow] duration-500 ease-out-soft focus-within:ring-2 focus-within:ring-accent hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(22,50,43,0.4)]">
                  <div className="overflow-hidden">
                    <ArtTile
                      variant={s.tile}
                      className="aspect-[4/3] w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <p className="meta-label">{s.grades}</p>
                    <h3 className="display mt-3 text-[1.6rem]">
                      <Link href={s.href} className="outline-none after:absolute after:inset-0">
                        {s.name}
                      </Link>
                    </h3>
                    <p className="mt-3 text-[0.97rem] text-muted">{s.blurb}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Curriculum assurance */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              title="A curriculum we are proud to put in front of any parent."
              lede="Our programme is chosen, reviewed and taught with one standard in mind: that it should stand with the finest education available in our community. Ask us to show you exactly how."
            />
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ArrowLink href="/academics/curriculum">How we teach and what we teach</ArrowLink>
              <ArrowLink href="/academics/teaching-methodology">Our teaching methods</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="arch mx-auto aspect-[4/5] w-full max-w-sm">
              <ArtTile variant={1} className="h-full w-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Head's welcome */}
      <section className="section">
        <div className="container-x">
          <Reveal>
            <figure className="mx-auto max-w-4xl text-center">
              <svg
                viewBox="0 0 40 40"
                aria-hidden="true"
                className="mx-auto size-10 text-gold-deep"
                fill="currentColor"
              >
                <path d="M6 28c0-9 4-16 12-19l1.5 3C14 14 12.5 17 12.5 20H18v12H6zm16 0c0-9 4-16 12-19l1.5 3C30 14 28.5 17 28.5 20H34v12H22z" />
              </svg>
              <blockquote className="display mt-8 text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.18]">
                We are not in a hurry. Childhood is not a race to be won, but
                a long and remarkable walk worth taking with good company.
              </blockquote>
              <figcaption className="mt-8 text-muted">
                <span className="font-medium text-ink">Shri Smt Lakshmishashidhar</span>
                <span aria-hidden="true"> &middot; </span>
                Principal
              </figcaption>
              <div className="mt-8">
                <ArrowLink href="/about/principals-message">A letter from the Principal</ArrowLink>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      <DayTimeline
        eyebrow="A day at Oxford"
        title="An unhurried day, with room to breathe."
        lede="Here is how an ordinary Tuesday unfolds. Better still, come and see it with us."
      >
        <ArrowLink href={cta.href} tone="light">
          {cta.label}
        </ArrowLink>
      </DayTimeline>

      {/* Beyond the classroom */}
      <section className="section bg-sage/60">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              title="Learning does not stop at the bell."
              lede="Teams, clubs, stages and trips fill the hours around lessons, and the photographs and reports from each appear on our pages as they happen."
            />
            <div className="mt-8">
              <ArrowLink href="/activities">All activities</ArrowLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-3">
              {activityLinks.map((a) => (
                <li key={a.href}>
                  <Link
                    href={a.href}
                    className="inline-flex min-h-12 items-center rounded-full border border-ink/20 bg-parchment px-6 text-[1.02rem] text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-parchment"
                  >
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* News */}
      {upcoming.length > 0 && (
        <section className="section bg-paper">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal>
                <SectionHeading title="News and upcoming events." />
              </Reveal>
              <Reveal>
                <ArrowLink href="/news">All news and events</ArrowLink>
              </Reveal>
            </div>
            <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
              {upcoming.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 0.1}>
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
