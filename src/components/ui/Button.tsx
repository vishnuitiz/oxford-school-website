import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[0.95rem] font-medium tracking-wide transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-soft cursor-pointer active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-[0_1px_0_rgba(255,255,255,0.18)_inset,0_10px_24px_-12px_rgba(31,106,73,0.7)] hover:bg-accent-deep hover:shadow-[0_14px_28px_-12px_rgba(20,80,58,0.75)]",
  secondary:
    "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-parchment",
  light:
    "bg-parchment text-ink hover:bg-white focus-visible:outline-parchment",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  arrow = true,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}

type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: Variant;
  arrow?: boolean;
  className?: string;
};

export function Button({
  variant = "primary",
  arrow = true,
  className = "",
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
        />
      )}
    </button>
  );
}

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  tone?: "dark" | "light";
  className?: string;
  children: ReactNode;
};

export function ArrowLink({
  tone = "dark",
  className = "",
  children,
  ...props
}: ArrowLinkProps) {
  const color =
    tone === "dark"
      ? "text-ink decoration-accent/50 hover:decoration-accent"
      : "text-parchment decoration-gold/60 hover:decoration-gold";
  return (
    <Link
      className={`group inline-flex min-h-11 items-center gap-2 font-medium underline decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 ${color} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
      />
    </Link>
  );
}
