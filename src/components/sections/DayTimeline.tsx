import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { dayAtSchool } from "@/lib/content";

// As the section scrolls past, a line draws down the page and a small sun travels along it (CSS scroll-driven animation).
export function DayTimeline({ eyebrow, title, lede, children }: { eyebrow?: string; title: string; lede?: string; children?: ReactNode }) {
  return (
    <section className="section bg-ink text-parchment">
      <div className="container-x grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading tone="light" eyebrow={eyebrow} title={title} lede={lede} />
          {children && <div className="mt-10">{children}</div>}
        </Reveal>
        <div className="day relative">
          <div className="day-line" aria-hidden="true">
            <i />
            <b className="day-sun" />
          </div>
          <ol className="pl-10">
            {dayAtSchool.map((d, i) => (
              <li key={d.time} className="day-item relative border-b border-parchment/15 first:border-t" style={{ "--i": i } as CSSProperties}>
                <div className="grid grid-cols-[4.5rem_1fr] gap-6 py-6 sm:grid-cols-[6rem_1fr]">
                  <span className="display text-3xl text-gold sm:text-4xl">{d.time}</span>
                  <div>
                    <h3 className="font-serif text-xl">{d.title}</h3>
                    <p className="mt-1 text-parchment/70">{d.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
