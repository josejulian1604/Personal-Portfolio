import type { CSSProperties, ReactNode } from "react";
import { STAGGER } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before this item reveals. */
  delay?: number;
  /** Position within a staggered group; adds `index * STAGGER` (60ms) of delay. */
  index?: number;
}

/**
 * Fade + 14px rise, 600ms, ease-out-quint, once, on first view.
 *
 * A server component: it only marks the element with `data-reveal` and a delay.
 * The transition lives in globals.css, and one shared <RevealObserver> island
 * (in the root layout) adds `data-revealed` when the element scrolls into view.
 * This keeps dozens of reveal wrappers out of the hydration bundle.
 *
 * Under reduced motion the content is shown instantly (CSS guard). Without JS,
 * a <noscript> rule in the root layout shows it. Content starts hidden until
 * the observer runs, so do not wrap LCP-critical above-the-fold text in it.
 */
export function Reveal({ children, className, delay = 0, index = 0 }: RevealProps) {
  const ms = Math.round((delay + index * STAGGER) * 1000);
  const style = ms > 0 ? ({ "--reveal-delay": `${ms}ms` } as CSSProperties) : undefined;

  return (
    <div data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
