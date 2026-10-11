import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  crumbs?: Crumb[];
};

export function PageHero({ eyebrow, title, lede, children, crumbs }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-sand">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-sand"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-1/2 size-[22rem] -translate-y-1/2 rounded-full border border-sand"
      />
      <div className="container-x relative pb-16 pt-14 sm:pb-24 sm:pt-20">
        {crumbs && crumbs.length > 1 && <Breadcrumbs trail={crumbs} />}
        <Reveal immediate>
          <p className="eyebrow">{eyebrow}</p>
        </Reveal>
        <Reveal immediate delay={0.08}>
          <h1 className="display mt-6 max-w-4xl text-[clamp(2.4rem,5vw,3.75rem)]">
            {title}
          </h1>
        </Reveal>
        {lede && (
          <Reveal immediate delay={0.16}>
            <p className="lede mt-8">{lede}</p>
          </Reveal>
        )}
        {children && (
          <Reveal immediate delay={0.24}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
