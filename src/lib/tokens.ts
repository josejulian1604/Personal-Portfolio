/**
 * Nocturne primitives as literal values, for contexts that cannot read CSS
 * custom properties: the viewport `themeColor` meta tag and the Open Graph
 * images rendered by `next/og` (Satori has no access to globals.css).
 *
 * These mirror the primitives in src/app/globals.css one to one. Change them
 * there first, then here. Components must keep using Tailwind utilities and
 * CSS variables, never these values.
 */
export const nocturne = {
  ink950: "#0b0a10",
  ink900: "#121019",
  ink850: "#18151f",
  ink800: "#24202d",
  ink700: "#322c3f",
  ink600: "#615a73",
  mist50: "#f4f2f8",
  mist300: "#a9a3b8",
  mist500: "#847e95",
  violet300: "#c4b5fd",
  violet400: "#a78bfa",
  violet500: "#8b5cf6",
  violet600: "#7c3aed",
} as const;
