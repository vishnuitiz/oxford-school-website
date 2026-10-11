import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ArrowLink } from "@/components/ui/Button";
import { cta, footerColumns, legalLinks, mapsUrl, site } from "@/lib/site";

const linkClass = "inline-flex min-h-11 items-center text-parchment/90 transition-colors hover:text-gold focus-visible:outline-gold";
const heading = "text-sm font-semibold uppercase tracking-[0.18em] text-parchment/60";

export function Footer() {
  const { address } = site;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-20 text-parchment sm:pb-0">
      <div className="container-x pt-20 sm:pt-28">
        <div className="border-b border-parchment/15 pb-16">
          <p className="display max-w-3xl text-[clamp(2rem,4vw,3.1rem)]">
            The best way to know a school is to spend a morning in it.
          </p>
          <div className="mt-8">
            <ArrowLink href={cta.href} tone="light">
              {cta.label}
            </ArrowLink>
          </div>
        </div>

        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="space-y-5">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-parchment/70">
              {site.tagline}. A day school for children from Nursery to Grade 10, since {site.founded}.
            </p>
            <address className="text-sm not-italic leading-relaxed text-parchment/80">
              {address.street}
              <br />
              {address.locality}, {address.region} {address.postalCode}
              <br />
              {address.country}
            </address>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-sm text-parchment/90 underline decoration-parchment/40 underline-offset-4 transition-colors hover:text-gold"
            >
              Get directions<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className={heading}>{col.heading}</h2>
              <ul className="mt-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="text-sm leading-relaxed text-parchment/80">
            <h2 className={heading}>Talk to us</h2>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="mt-3 flex min-h-11 items-center transition-colors hover:text-gold">
              {site.phone}
            </a>
            <a href={`tel:${site.phone2.replace(/\s/g, "")}`} className="flex min-h-11 items-center transition-colors hover:text-gold">
              {site.phone2}
            </a>
            <p className="mt-2 text-parchment/60">{site.hours}</p>
            <ul className="mt-2 flex flex-wrap gap-x-5">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-parchment/70 transition-colors hover:text-gold"
                  >
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-parchment/15 py-8 text-sm text-parchment/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
