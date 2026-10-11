"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { m } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { cta, headerLinks, nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-sand bg-parchment/90 backdrop-blur-md"
          : "border-b border-transparent bg-parchment"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-3 lg:h-20 xl:gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-2.5 xl:gap-6">
            {headerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative inline-flex min-h-11 items-center whitespace-nowrap py-2 text-[0.95rem] font-medium transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:bg-accent after:transition-transform after:duration-300 ${
                    isActive(item.href)
                      ? "text-ink after:scale-x-100"
                      : "text-ink-soft after:scale-x-0 hover:text-ink hover:after:scale-x-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            aria-label={`Call us on ${site.phone}`}
            className="hidden size-11 place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-parchment xl:grid"
          >
            <Phone aria-hidden="true" className="size-5" />
          </a>
          <div className="hidden sm:block">
            <ButtonLink href={cta.href} className="!min-h-11 !px-3.5 whitespace-nowrap xl:!px-6">
              {cta.label}
            </ButtonLink>
          </div>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="inline-flex size-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-parchment"
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm data-[state=closed]:animate-[fade-out_200ms_ease-in] data-[state=open]:animate-[fade-in_250ms_ease-out]" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col lg:max-w-3xl bg-parchment px-6 pb-8 pt-5 shadow-2xl data-[state=closed]:animate-[slide-out_220ms_ease-in] data-[state=open]:animate-[slide-in_350ms_cubic-bezier(0.22,1,0.36,1)]"
              >
                <div className="flex items-center justify-between">
                  <Dialog.Title className="font-serif text-xl text-ink">
                    {site.name}
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="grid size-11 cursor-pointer place-items-center rounded-full border border-ink/20 text-ink transition-colors hover:bg-ink hover:text-parchment"
                    >
                      <X aria-hidden="true" className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Mobile" className="mt-6 flex-1 overflow-y-auto">
                  <ul className="divide-y divide-sand border-y border-sand lg:columns-2 lg:gap-x-14 lg:divide-y-0 lg:border-y-0">
                    {nav.map((item, i) => (
                      <m.li
                        key={item.href}
                        initial={{ y: 16 }}
                        animate={{ y: 0 }}
                        transition={{ delay: 0.06 + i * 0.05, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="py-2 lg:break-inside-avoid lg:border-t lg:border-sand lg:py-3"
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={`flex min-h-12 items-center font-serif text-[1.55rem] tracking-tight transition-colors ${
                            isActive(item.href) ? "text-accent" : "text-ink hover:text-accent"
                          }`}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <ul className="mb-1 flex flex-wrap gap-x-5">
                            {item.children.map((c) => (
                              <li key={c.href}>
                                <Link
                                  href={c.href}
                                  onClick={() => setOpen(false)}
                                  aria-current={pathname === c.href ? "page" : undefined}
                                  className={`inline-flex min-h-11 items-center text-[0.95rem] ${
                                    pathname === c.href ? "font-medium text-accent" : "text-muted hover:text-ink"
                                  }`}
                                >
                                  {c.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </m.li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-8 space-y-4">
                  <ButtonLink
                    href={cta.href}
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    {cta.label}
                  </ButtonLink>
                  <p className="text-center text-sm text-muted">
                    Or call us on{" "}
                    <a
                      href={`tel:${site.phone.replace(/\s/g, "")}`}
                      className="font-medium text-ink underline decoration-accent/50 underline-offset-4"
                    >
                      {site.phone}
                    </a>
                  </p>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
