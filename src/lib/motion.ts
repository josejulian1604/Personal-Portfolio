/**
 * Shared motion tokens. Keep in sync with the CSS tokens in globals.css
 * (--ease-out-quint, --duration-*) and docs/BRAND.md.
 *
 * - Hover / press: 150ms in CSS. Hover-in uses --duration-ui (250ms) and
 *   hover-out --duration-hover (150ms), so exits are faster than entrances.
 * - Reveals: CSS transitions driven by <RevealObserver>, 600ms, once.
 * - The hero loop (the only `motion` island) uses DURATION.draw / pulseLap.
 */

/** cubic-bezier(0.22, 1, 0.36, 1): fast start, long soft landing. */
export const EASE_OUT_QUINT = [0.22, 1, 0.36, 1] as const;

/** Durations in seconds (motion uses seconds). */
export const DURATION = {
  hover: 0.15,
  ui: 0.25,
  reveal: 0.6,
  /** One-off draw of the hero loop path. */
  draw: 1.8,
  /** One full lap of the pulse around the loop: deliberately slow. */
  pulseLap: 9,
} as const;

/** Delay between staggered siblings, in seconds. */
export const STAGGER = 0.06;

/** Vertical travel for reveals, in px (12–16px range). Mirrored in globals.css. */
export const REVEAL_OFFSET = 14;
