import { Clock, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { FormCard } from "@/components/sections/FormCard";
import { pageMeta } from "@/lib/meta";
import { mapsUrl, site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact",
  description: `Get in touch with ${site.name}: address, phone and the enquiry form.`,
  path: "/contact",
});

export default function ContactPage() {
  const { address } = site;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We would love to hear from you."
        lede="Questions about the school, a visit, or anything else. Call us, send an enquiry, or drop in."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact", href: "/contact" }]}
      />

      <section className="section">
        <div className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.2vw,2.5rem)]">Find us</h2>
            <ul className="mt-10 space-y-7">
              <li className="flex gap-5">
                <MapPin aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                <address className="not-italic text-ink-soft">
                  {address.street}
                  <br />
                  {address.locality}, {address.region} {address.postalCode}
                  <br />
                  {address.country}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex min-h-11 items-center underline decoration-accent/50 underline-offset-4 hover:text-accent"
                  >
                    Get directions<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </address>
              </li>
              <li className="flex gap-5">
                <Phone aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                <div className="text-ink-soft">
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex min-h-11 items-center hover:text-accent">
                    {site.phone}
                  </a>
                  <a href={`tel:${site.phone2.replace(/\s/g, "")}`} className="flex min-h-11 items-center hover:text-accent">
                    {site.phone2}
                  </a>
                </div>
              </li>
              <li className="flex gap-5">
                <Clock aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                <p className="text-ink-soft">{site.hours}</p>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <FormCard
              title="Send us a question"
              body="Use our enquiry form for questions about admissions, visits or anything else. A member of the team will reply within two working days."
              label="Open the enquiry form"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
