import Link from "next/link";
import {
  BookOpen, Check, Flag, HeartHandshake, Leaf, MapPin, Music, Palette, Star, Trophy, Users,
} from "lucide-react";
import type { ComponentType } from "react";
import { ArtTile } from "@/components/illustrations/Illustrations";
import { NewsCard } from "@/components/cards/NewsCard";
import { DayTimeline } from "@/components/sections/DayTimeline";
import { Faq } from "@/components/sections/Faq";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stages } from "@/lib/content";
import { getByTopic } from "@/lib/news";
import { childrenOf, getPage, type Block, type IconName } from "@/lib/pages";

const icons: Record<IconName, ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean | "true" }>> = {
  music: Music, trophy: Trophy, leaf: Leaf, heart: HeartHandshake, book: BookOpen,
  users: Users, palette: Palette, flag: Flag, map: MapPin, star: Star,
};

const gridCols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3" } as const;

export function Blocks({ blocks, path }: { blocks: Block[]; path: string }) {
  return (
    <>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} path={path} />
      ))}
    </>
  );
}

function BlockView({ block: b, path }: { block: Block; path: string }) {
  switch (b.kind) {
    case "split":
      return (
        <section className="section">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading title={b.title} />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-school">
                {b.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      );

    case "cards": {
      const cols = b.cols ?? 3;
      return (
        <section className={`section ${b.tone === "sage" ? "bg-sage/60" : ""}`}>
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            <ul className={`mt-14 grid grid-cols-1 gap-6 ${gridCols[cols]} ${cols === 3 && b.items.length > 3 ? "lg:grid-cols-3" : ""}`}>
              {b.items.map((it, i) => {
                const Icon = it.icon ? icons[it.icon] : null;
                return (
                  <Reveal as="li" key={it.title} delay={(i % 3) * 0.08}>
                    <div className={`h-full rounded-3xl border border-sand p-9 ${b.tone === "sage" ? "bg-parchment" : "bg-paper"}`}>
                      {Icon && (
                        <span className="mb-6 grid size-12 place-items-center rounded-full bg-sage text-ink">
                          <Icon aria-hidden="true" className="size-6" strokeWidth={1.6} />
                        </span>
                      )}
                      {b.numbered && (
                        <span aria-hidden="true" className="display mb-5 block text-5xl text-gold-deep">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                      <h3 className="display text-[1.6rem] leading-tight">{it.title}</h3>
                      <p className="mt-3 text-muted">{it.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      );
    }

    case "steps":
      return (
        <section className="section">
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {b.items.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 0.08}>
                  <div className="h-full rounded-3xl border border-sand bg-paper p-8">
                    <span aria-hidden="true" className="display text-5xl text-gold-deep">{i + 1}</span>
                    <h3 className="display mt-5 text-[1.6rem]">{s.title}</h3>
                    <p className="mt-3 text-muted">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      );

    case "checklist":
      return (
        <section className="section">
          <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="space-y-4 rounded-3xl border border-sand bg-paper p-8 sm:p-10">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-ink-soft">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" strokeWidth={2} />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      );

    case "table":
      return (
        <section className="section">
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            <Reveal delay={0.1}>
              <div tabIndex={0} role="region" aria-label={b.title} className="mt-10 overflow-x-auto rounded-3xl border border-sand bg-paper">
                <table className="w-full min-w-[28rem] border-collapse text-left">
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th key={h} scope="col" className="border-b border-sand px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r) => (
                      <tr key={r[0]} className="border-b border-sand last:border-0">
                        <th scope="row" className="px-6 py-4 font-serif text-lg font-normal text-ink">{r[0]}</th>
                        {r.slice(1).map((c) => (
                          <td key={c} className="px-6 py-4 text-ink-soft">{c}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </section>
      );

    case "faq":
      return (
        <section className="section bg-sage/60">
          <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            <Reveal delay={0.1}>
              <Faq items={b.items} />
            </Reveal>
          </div>
        </section>
      );

    case "timeline":
      return (
        <section className="section">
          <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <SectionHeading title={b.title} />
            </Reveal>
            <ol className="relative border-l border-sand pl-8">
              {b.items.map((t, i) => (
                <Reveal as="li" key={t.year} delay={i * 0.06} className="relative pb-10 last:pb-0">
                  <span aria-hidden="true" className="absolute -left-[2.2rem] top-2.5 size-3 rounded-full border-2 border-accent bg-parchment" />
                  <p className="display text-3xl text-accent">{t.year}</p>
                  <p className="mt-2 max-w-lg text-muted">{t.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      );

    case "letter":
      return (
        <section className="section bg-ink text-parchment">
          <div className="container-x grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <Reveal>
              <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-parchment/85">
                {b.paragraphs.map((p, i) => (
                  <p key={p} className={i === 0 ? "display text-[clamp(1.8rem,3.4vw,2.6rem)] text-parchment" : ""}>{p}</p>
                ))}
                <p className="font-serif text-xl text-parchment">
                  {b.name}
                  <span className="block font-sans text-sm text-parchment/70">{b.role}</span>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <ArtTile variant={0} className="aspect-[4/5] w-full rounded-[2rem]" />
            </Reveal>
          </div>
        </section>
      );

    case "people":
      return (
        <section className="section">
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} align="center" />
            </Reveal>
            <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              {b.items.map((l, i) => (
                <Reveal as="li" key={l.name} delay={i * 0.1}>
                  <div className="overflow-hidden rounded-3xl border border-sand bg-paper">
                    <ArtTile variant={(i % 4) as 0 | 1 | 2 | 3} className="aspect-square w-full" />
                    <div className="p-6">
                      <h3 className="font-serif text-xl">{l.name}</h3>
                      <p className="mt-1 text-sm text-muted">{l.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      );

    case "stage": {
      const s = stages.find((x) => x.slug === b.slug);
      if (!s) return null;
      return (
        <>
          <section className="section">
            <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <ArtTile variant={s.tile} className="aspect-[5/4] w-full rounded-[2rem]" />
              </Reveal>
              <Reveal delay={0.1}>
                <p className="meta-label">
                  {s.grades} <span aria-hidden="true">&middot;</span> {s.ages}
                </p>
                <p className="lede mt-5">{s.blurb}</p>
                <ul className="mt-8 space-y-3">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-3 text-ink-soft">
                      <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" strokeWidth={2} />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>
          <section className="section bg-sage/60">
            <div className="container-x">
              <Reveal>
                <SectionHeading title="What your child learns." />
              </Reveal>
              <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
                {s.areas.map((a, i) => (
                  <Reveal as="li" key={a.title} delay={(i % 2) * 0.08}>
                    <div className="h-full rounded-3xl bg-parchment p-9">
                      <h3 className="display text-[1.6rem] leading-tight">{a.title}</h3>
                      <p className="mt-3 text-muted">{a.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        </>
      );
    }

    case "stages":
      return (
        <section className="section">
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stages
                .filter((s) => s.href !== path)
                .map((s, i) => (
                  <Reveal as="li" key={s.slug} delay={i * 0.08}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sand bg-paper transition-[transform,box-shadow] duration-500 ease-out-soft focus-within:ring-2 focus-within:ring-accent hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(22,50,43,0.4)]">
                      <div className="overflow-hidden">
                        <ArtTile variant={s.tile} className="aspect-[4/3] w-full transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]" />
                      </div>
                      <div className="flex flex-1 flex-col p-7">
                        <p className="meta-label">{s.grades}</p>
                        <h3 className="display mt-3 text-[1.6rem]">
                          <Link href={s.href} className="outline-none after:absolute after:inset-0">{s.name}</Link>
                        </h3>
                        <p className="mt-3 text-[0.97rem] text-muted">{s.blurb}</p>
                      </div>
                    </article>
                  </Reveal>
                ))}
            </ul>
          </div>
        </section>
      );

    case "chips":
      return (
        <section className="section bg-ink text-parchment">
          <div className="container-x grid items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <SectionHeading tone="light" title={b.title} lede={b.lede} />
              <ul className="mt-10 flex flex-wrap gap-3">
                {b.items.map((c) => (
                  <li key={c} className="rounded-full border border-parchment/25 px-5 py-2 text-sm text-parchment/90">{c}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <ArtTile variant={2} className="aspect-[5/4] w-full rounded-[2rem]" />
            </Reveal>
          </div>
        </section>
      );

    case "topic": {
      const items = getByTopic(b.topic);
      return (
        <section className="section bg-paper">
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} lede={b.lede} />
            </Reveal>
            {items.length === 0 ? (
              <p className="mt-10 text-muted">{b.empty}</p>
            ) : (
              <>
                <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((a, i) => (
                    <Reveal as="li" key={a.slug} delay={(i % 3) * 0.08}>
                      <NewsCard item={a} />
                    </Reveal>
                  ))}
                </ul>
                <div className="mt-10">
                  <ArrowLink href="/gallery">See photos in the gallery</ArrowLink>
                </div>
              </>
            )}
          </div>
        </section>
      );
    }

    case "children": {
      const kids = (b.paths ? b.paths.map((p) => getPage(p)) : childrenOf(path)).filter((p): p is NonNullable<typeof p> => !!p);
      const links = [
        ...kids.map((p) => ({ title: p.title, body: p.lede, href: p.path })),
        ...(b.extra ?? []),
      ];
      return (
        <section className="section bg-sage/60">
          <div className="container-x">
            <Reveal>
              <SectionHeading title={b.title} />
            </Reveal>
            <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {links.map((l, i) => (
                <Reveal as="li" key={l.href} delay={(i % 3) * 0.08}>
                  <article className="group relative h-full rounded-3xl bg-parchment p-8 transition-[transform,box-shadow] duration-500 ease-out-soft focus-within:ring-2 focus-within:ring-accent hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(22,50,43,0.4)]">
                    <h3 className="display text-[1.55rem] leading-tight">
                      <Link href={l.href} className="outline-none after:absolute after:inset-0">{l.title}</Link>
                    </h3>
                    <p className="mt-3 text-[0.97rem] text-muted">{l.body}</p>
                  </article>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      );
    }

    case "day":
      return <DayTimeline title={b.title} lede={b.lede} />;

    case "sections":
      return (
        <section className="section">
          <div className="container-x">
            <div className="prose-school space-y-8">
              {b.items.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-serif text-2xl text-ink">{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p} className="mt-3">{p}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
  }
}
