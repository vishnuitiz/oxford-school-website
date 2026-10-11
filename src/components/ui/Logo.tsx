import Link from "next/link";
import { site } from "@/lib/site";

// Intrinsic ratio of the logo mark (2618 x 1020).
export function LogoMark({ className = "h-9", light = false }: { className?: string; light?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={light ? "/logo-mark-light.svg" : "/logo-mark.svg"} alt="" width={257} height={100} className={`w-auto ${className}`} />
  );
}

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className={`flex min-h-11 shrink-0 items-center gap-3 ${tone === "dark" ? "text-ink" : "text-parchment"}`}
    >
      <LogoMark light={tone === "light"} className={tone === "light" ? "h-11" : "h-6 xl:h-8"} />
      <span className="flex flex-col">
        <span className="font-serif text-[1.5rem] leading-none tracking-tight">
          {site.shortName}{" "}
        </span>
        <span className="mt-1 whitespace-nowrap text-[0.58rem] font-medium uppercase leading-none tracking-[0.1em] opacity-80 xl:text-[0.6rem] xl:tracking-[0.12em]">
          {site.descriptor}
        </span>
      </span>
    </Link>
  );
}
