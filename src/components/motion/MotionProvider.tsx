"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** App-wide motion config: honor the OS "reduce motion" setting. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
