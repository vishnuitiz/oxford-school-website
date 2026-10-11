import type { CSSProperties, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger for `immediate` reveals only; scroll-driven reveals follow scroll position. */
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
  /** Above-the-fold content: play on load instead of on scroll. */
  immediate?: boolean;
};

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  as: Tag = "div",
  immediate = false,
}: RevealProps) {
  const style = {
    "--rise-y": `${y}px`,
    ...(immediate ? { animationDelay: `${delay}s` } : {}),
  } as CSSProperties;

  return (
    <Tag className={`${immediate ? "rise" : "reveal"} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
