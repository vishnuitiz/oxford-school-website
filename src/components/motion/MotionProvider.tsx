"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// One shared feature set, fetched after the page is interactive so it never delays the first paint. reducedMotion="user" turns movement off for people who ask for that.
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={() => import("./features").then((r) => r.default)}>{children}</LazyMotion>
    </MotionConfig>
  );
}
