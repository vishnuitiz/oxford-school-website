import { NewsCard } from "@/components/cards/NewsCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Article } from "@/lib/news";

export function CardSection({ title, items, tint = false }: { title: string; items: Article[]; tint?: boolean }) {
  return (
    <section className={`section ${tint ? "bg-paper" : ""}`}>
      <div className="container-x">
        <Reveal>
          <SectionHeading title={title} />
        </Reveal>
        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal as="li" key={item.slug} delay={Math.min(i, 5) * 0.08}>
              <NewsCard item={item} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Empty({ children }: { children: string }) {
  return (
    <section className="section">
      <div className="container-x">
        <p className="lede">{children}</p>
      </div>
    </section>
  );
}
