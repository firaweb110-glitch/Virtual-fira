"use client";

import { MotionConfig } from "framer-motion";

/** Makes every Framer Motion animation respect prefers-reduced-motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
