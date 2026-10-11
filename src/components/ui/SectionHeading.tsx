import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
}: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto text-center" : ""}>
      {eyebrow && (
        <p className={`eyebrow mb-5 ${tone === "light" ? "!text-gold" : ""}`}>
          {eyebrow}
        </p>
      )}
      <Tag
        className={`display text-[clamp(2.1rem,4.6vw,3.6rem)] ${center ? "mx-auto max-w-3xl" : "max-w-3xl"} ${tone === "light" ? "text-parchment" : "text-ink"}`}
      >
        {title}
      </Tag>
      {lede && (
        <p
          className={`lede mt-6 ${center ? "mx-auto" : ""} ${tone === "light" ? "!text-parchment/75" : ""}`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
