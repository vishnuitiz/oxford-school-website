"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

// Nudges a button a few pixels toward the mouse. Mouse only; it never moves for touch or keyboard.
export function Magnetic({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 });
  const sy = useSpring(y, { stiffness: 220, damping: 16 });
  return (
    <m.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(Math.max(-7, Math.min(7, (e.clientX - (r.left + r.width / 2)) * 0.18)));
        y.set(Math.max(-5, Math.min(5, (e.clientY - (r.top + r.height / 2)) * 0.22)));
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </m.div>
  );
}
