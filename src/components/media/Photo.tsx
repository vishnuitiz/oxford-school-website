import type { Photo as PhotoData } from "@/lib/news";

// Photos are resized and converted by scripts/prebuild.mjs, so a plain <img> with srcset is all that is needed.
export function Photo({
  photo,
  sizes,
  className = "",
  eager = false,
}: {
  photo: PhotoData;
  sizes: string;
  className?: string;
  eager?: boolean;
}) {
  const widest = Math.max(...photo.widths);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`${photo.src}-${widest}.webp`}
      srcSet={photo.widths.map((w) => `${photo.src}-${w}.webp ${w}w`).join(", ")}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
