import type React from "react";

// Drawn artwork that stands in for photography until real campus images are supplied.

const tiles = [
  { bg: "#dfe6dc", a: "#fb8430", b: "#16322b", c: "#f7c08a" },
  { bg: "#16322b", a: "#f7c08a", b: "#f6f1e7", c: "#fb8430" },
  { bg: "#fb8430", a: "#f6f1e7", b: "#16322b", c: "#f7c08a" },
  { bg: "#e2d9c8", a: "#16322b", b: "#fb8430", c: "#4f7a69" },
] as const;

export function ArtTile({
  variant = 0,
  className = "",
}: {
  variant?: 0 | 1 | 2 | 3;
  className?: string;
}) {
  const t = tiles[variant];
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <rect width="400" height="300" fill={t.bg} />
      {variant === 0 && (
        <>
          <circle cx="285" cy="104" r="46" fill={t.a} />
          <path d="M60 300V170a80 80 0 0 1 160 0v130z" fill={t.b} />
          <path d="M92 300V176a48 48 0 0 1 96 0v124z" fill={t.bg} />
          <path d="M0 262c80-26 160 0 240-14s110-6 160 4v48H0z" fill={t.c} opacity="0.7" />
        </>
      )}
      {variant === 1 && (
        <>
          <g fill="none" stroke={t.a} strokeWidth="2">
            <circle cx="200" cy="170" r="120" />
            <circle cx="200" cy="170" r="88" />
            <circle cx="200" cy="170" r="56" />
          </g>
          <circle cx="200" cy="170" r="24" fill={t.c} />
          <path d="M0 300V250l80-30 80 30v50z" fill={t.b} opacity="0.12" />
        </>
      )}
      {variant === 2 && (
        <>
          <g fill="none" stroke={t.a} strokeWidth="2.4" strokeLinecap="round">
            <path d="M40 300V190a50 50 0 0 1 100 0v110" />
            <path d="M150 300V190a50 50 0 0 1 100 0v110" />
            <path d="M260 300V190a50 50 0 0 1 100 0v110" />
          </g>
          <circle cx="200" cy="82" r="30" fill={t.c} />
        </>
      )}
      {variant === 3 && (
        <>
          <g stroke={t.a} strokeWidth="2" opacity="0.5">
            <path d="M0 80h400M0 130h400M0 180h400M0 230h400" />
          </g>
          <circle cx="120" cy="140" r="58" fill={t.b} />
          <rect x="210" y="96" width="120" height="120" rx="60" fill={t.c} />
        </>
      )}
    </svg>
  );
}
