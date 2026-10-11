import { CountUp } from "@/components/motion/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/lib/content";
import { site } from "@/lib/site";

const tile = "relative overflow-hidden rounded-3xl p-8 sm:p-10 transition-[transform,box-shadow] duration-500 ease-out-soft hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgba(22,50,43,0.4)]";

// Asymmetric "bento" grid: one big statement tile, four number tiles and three pillar tiles.
export function Bento() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 lg:grid-cols-12">
          <Reveal className="md:col-span-6 lg:col-span-6 lg:row-span-2">
            <div className={`${tile} flex h-full min-h-[22rem] flex-col justify-between bg-ink text-parchment`}>
              <svg aria-hidden="true" viewBox="0 0 200 240" className="pointer-events-none absolute -right-8 -top-6 h-72 text-gold/25" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M10 240V100a90 90 0 0 1 180 0v140" />
                <path d="M32 240V102a68 68 0 0 1 136 0v138" />
                <path d="M54 240V104a46 46 0 0 1 92 0v136" />
              </svg>
              <h2 className="display relative max-w-md text-[clamp(2rem,3.6vw,3.1rem)] text-parchment">
                Sized so that no one is overlooked.
              </h2>
              <p className="relative mt-8 max-w-md text-parchment/75">
                Everything about Oxford, from the way our classes are sized to the length of our lunch break, is arranged around one idea: children learn best when they feel known.
              </p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-3 lg:col-span-3" delay={0.05}>
            <div className={`${tile} h-full border border-sand bg-paper`}>
              <p className="display text-[clamp(2.4rem,4vw,3.4rem)] text-ink">
                <CountUp to={site.founded} from={1900} />
              </p>
              <p className="mt-2 text-sm text-muted">Welcoming families since</p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-3 lg:col-span-3" delay={0.1}>
            <div className={`${tile} h-full border border-sand bg-paper`}>
              <p className="display text-[clamp(2.4rem,4vw,3.4rem)] text-ink">
                1 : <CountUp to={9} from={1} />
              </p>
              <p className="mt-2 text-sm text-muted">Teachers to students</p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-3 lg:col-span-3" delay={0.05}>
            <div className={`${tile} h-full bg-sage`}>
              <p className="display text-[clamp(1.9rem,2.8vw,2.6rem)] text-ink">
                Right-sized
              </p>
              <p className="mt-2 text-sm text-ink-soft">Classes with room for friendship and debate, and for every child to be heard</p>
            </div>
          </Reveal>

          <Reveal className="md:col-span-3 lg:col-span-3" delay={0.1}>
            <div className={`${tile} h-full border border-sand bg-paper`}>
              <p className="display text-[clamp(2.4rem,4vw,3.4rem)] text-ink">
                <CountUp to={4} />
              </p>
              <p className="mt-2 text-sm text-muted">Stages, from Nursery to Grade 10</p>
            </div>
          </Reveal>

          {pillars.map((p, i) => (
            <Reveal key={p.title} className="md:col-span-2 lg:col-span-4" delay={i * 0.08}>
              <div className={`${tile} h-full border border-sand bg-paper`}>
                <span aria-hidden="true" className="display text-5xl text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-6 text-[1.6rem] leading-tight">{p.title}</h3>
                <p className="mt-4 text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
