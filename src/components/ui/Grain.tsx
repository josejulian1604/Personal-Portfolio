import { cn } from "@/lib/cn";

/**
 * Very subtle film grain over a section (decorative only).
 *
 * Drawn as an inline SVG filter rather than a CSS background image: a
 * full-section background image is a Largest Contentful Paint candidate, and
 * the grain was being measured as the hero's LCP element instead of the text.
 * Inline SVG shapes are not LCP candidates.
 */
export function Grain({ id, className }: { id: string; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none absolute inset-0 -z-10 size-full opacity-(--grain-opacity)", className)}
    >
      <filter id={id}>
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} />
    </svg>
  );
}
