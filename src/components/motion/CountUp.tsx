"use client";

import { useEffect, useRef } from "react";

// Shows the final number in the page source (and to screen readers); counts up once when scrolled into view.
// Plain requestAnimationFrame + IntersectionObserver: no library needed for this.
export function CountUp({ to, from = 0, className = "" }: { to: number; from?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1500);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = String(Math.round(from + (to - from) * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [from, to]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className={className}>{to}</span>
      <span className="sr-only">{to}</span>
    </>
  );
}
