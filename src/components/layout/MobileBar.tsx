import Link from "next/link";
import { Phone } from "lucide-react";
import { cta, site } from "@/lib/site";

export function MobileBar() {
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-parchment/15 bg-ink px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:hidden">
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-parchment/40 px-4 transition-transform active:scale-[0.98] text-[0.95rem] font-medium text-parchment"
        >
          <Phone aria-hidden="true" className="size-4" />
          Call us
        </a>
        <Link
          href={cta.href}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-4 text-[0.95rem] font-medium text-white transition-transform active:scale-[0.98]"
        >
          {cta.label}
        </Link>
      </div>
    </nav>
  );
}
