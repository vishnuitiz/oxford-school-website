import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/lib/site";

type Props = {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBand({
  title = "Begin with a conversation.",
  body = "Tell us a little about your child, and choose a day to visit if you like. Within two working days, our admissions office will get in touch to check your child’s eligibility and invite you for the admission interaction.",
  primary = cta,
  secondary = { label: "How admissions work", href: "/admissions" },
}: Props) {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-8 py-16 text-parchment sm:px-16 sm:py-24">
            <svg
              viewBox="0 0 400 400"
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 size-[28rem] text-parchment/10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="200" cy="200" r="190" />
              <circle cx="200" cy="200" r="140" />
              <circle cx="200" cy="200" r="90" />
              <circle cx="200" cy="200" r="40" />
            </svg>
            <div className="relative max-w-2xl">
              <h2 className="display text-[clamp(2.2rem,5vw,3.9rem)]">
                {title}
              </h2>
              <p className="mt-6 max-w-xl text-lg text-parchment">{body}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href={primary.href} variant="light">
                  {primary.label}
                </ButtonLink>
                <ArrowLink href={secondary.href} tone="light">
                  {secondary.label}
                </ArrowLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
