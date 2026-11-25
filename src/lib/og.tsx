import type { ReactNode } from "react";
import { COVER_H, COVER_W, coverArt, type CoverShape, type CoverTone } from "./cover-art";
import { nocturne } from "./tokens";

/*
 * Shared building blocks for the Open Graph images (next/og, 1200×630).
 *
 * Banner rules (banner-design skill): critical content inside a ~72px safe
 * margin, at most two typefaces (Inter + JetBrains Mono, as on the site), text
 * contrast ≥ 4.5:1 on the ink ground, headline well above 32px.
 *
 * Satori cannot read CSS variables, so colors come from lib/tokens.ts, which
 * mirrors the Nocturne primitives in globals.css.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;

/** "#8b5cf6", 0.3 → "rgba(139, 92, 246, 0.3)". */
export function alpha(hex: string, opacity: number): string {
  const value = Number.parseInt(hex.slice(1), 16);
  return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${opacity})`;
}
export const OG_PADDING = 72;

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" };

/**
 * Fetches a font subset (only the glyphs in `text`) as TTF from Google Fonts at
 * build time; next/og needs TTF/OTF/WOFF, which next/font does not expose.
 * Returns null on any failure (offline build, timeout), so the image still
 * renders with next/og's bundled default font instead of failing the build.
 */
async function loadGoogleFont(family: string, weight: 400 | 600, text: string): Promise<ArrayBuffer | null> {
  try {
    const query = `family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const cssResponse = await fetch(`https://fonts.googleapis.com/css2?${query}`, {
      cache: "force-cache",
      signal: AbortSignal.timeout(8000),
    });
    if (!cssResponse.ok) return null;
    const css = await cssResponse.text();
    const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const fontResponse = await fetch(src, { cache: "force-cache", signal: AbortSignal.timeout(8000) });
    return fontResponse.ok ? await fontResponse.arrayBuffer() : null;
  } catch {
    return null;
  }
}

/** Inter 600 (display) and 400 (body), JetBrains Mono 400 (metadata). Undefined → default font. */
export async function loadOgFonts(text: string): Promise<OgFont[] | undefined> {
  const [inter, interRegular, mono] = await Promise.all([
    loadGoogleFont("Inter", 600, text),
    loadGoogleFont("Inter", 400, text),
    loadGoogleFont("JetBrains Mono", 400, text),
  ]);
  const fonts: OgFont[] = [];
  if (inter) fonts.push({ name: "Inter", data: inter, weight: 600, style: "normal" });
  if (interRegular) fonts.push({ name: "Inter", data: interRegular, weight: 400, style: "normal" });
  if (mono) fonts.push({ name: "JetBrains Mono", data: mono, weight: 400, style: "normal" });
  return fonts.length > 0 ? fonts : undefined;
}

export const ogText = {
  display: { fontFamily: "Inter", fontWeight: 600 },
  body: { fontFamily: "Inter", fontWeight: 400 },
  mono: { fontFamily: "JetBrains Mono", fontWeight: 400, textTransform: "uppercase", letterSpacing: "0.08em" },
} as const;

/** Full-bleed ink ground with one soft violet glow (same recipe as the hero). */
export function OgFrame({ children, glowAt = "78% 38%" }: { children: ReactNode; glowAt?: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        backgroundColor: nocturne.ink950,
        backgroundImage: `radial-gradient(circle at ${glowAt}, ${alpha(nocturne.violet500, 0.3)}, ${alpha(nocturne.violet600, 0.08)} 32%, ${alpha(nocturne.ink950, 0)} 60%)`,
        color: nocturne.mist50,
        fontFamily: "Inter",
      }}
    >
      {children}
    </div>
  );
}

/** "JG" monogram tile with the violet dot, matching <Monogram>. */
export function OgMonogram({ initials }: { initials: string }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        borderRadius: 12,
        border: `1.5px solid ${nocturne.ink700}`,
        backgroundColor: nocturne.ink900,
        fontSize: 20,
        letterSpacing: "-0.02em",
        ...ogText.display,
      }}
    >
      {initials}
      <div
        style={{
          position: "absolute",
          right: -4,
          bottom: -4,
          width: 10,
          height: 10,
          borderRadius: 999,
          backgroundColor: nocturne.violet400,
        }}
      />
    </div>
  );
}

/** The hero's agent ⇄ human loop, drawn statically. Labels are HTML (resvg has no fonts). */
export function OgLoop({ width }: { width: number }) {
  const scale = width / 600;
  const height = 280 * scale;
  const path =
    "M300 140C355 52 480 52 480 140C480 228 355 228 300 140" + "C245 52 120 52 120 140C120 228 245 228 300 140Z";
  const label = (text: string, x: number, align: "left" | "right") => (
    <div
      style={{
        position: "absolute",
        top: height / 2 - 12,
        ...(align === "left" ? { right: width - (x - 34) * scale } : { left: (x + 34) * scale }),
        display: "flex",
        fontSize: 20,
        color: nocturne.mist300,
        ...ogText.mono,
        textTransform: "none",
        letterSpacing: "0.06em",
      }}
    >
      {text}
    </div>
  );

  return (
    <div style={{ display: "flex", position: "relative", width, height }}>
      <svg width={width} height={height} viewBox="0 0 600 280">
        <path d={path} fill="none" stroke={nocturne.ink700} strokeWidth={1.5} />
        <path d={path} fill="none" stroke={nocturne.violet400} strokeWidth={2.5} />
        <circle cx={120} cy={140} r={18} fill={nocturne.ink950} stroke={nocturne.ink700} strokeWidth={1.5} />
        <circle cx={120} cy={140} r={6} fill={nocturne.violet400} />
        <circle cx={480} cy={140} r={18} fill={nocturne.ink950} stroke={nocturne.ink700} strokeWidth={1.5} />
        <circle cx={480} cy={140} r={6} fill={nocturne.mist50} />
      </svg>
      {label("agent", 120, "left")}
      {label("human", 480, "right")}
    </div>
  );
}

const OG_STROKE: Record<CoverTone, string> = {
  grid: nocturne.ink800,
  track: nocturne.ink700,
  line: nocturne.violet400,
  accent: nocturne.violet400,
  hot: nocturne.violet300,
};

function ogCircleProps(shape: Extract<CoverShape, { kind: "circle" }>) {
  if (shape.fill === "node") return { fill: nocturne.violet300 };
  if (shape.fill === "dot") return { fill: nocturne.ink700 };
  return { fill: nocturne.ink900, stroke: nocturne.violet400, strokeWidth: 0.3 };
}

/**
 * A project's generated cover art (same data as <ProjectCover>), full-bleed.
 * Strokes scale with the canvas here, so widths are converted to canvas units.
 */
export function OgCoverArt({ slug }: { slug: string }) {
  const art = coverArt(slug);
  return (
    <svg
      width={OG_SIZE.width}
      height={OG_SIZE.height}
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        <radialGradient id="glow" gradientUnits="userSpaceOnUse" cx={art.glow.cx} cy={art.glow.cy} r={art.glow.r}>
          <stop offset="0" stopColor={nocturne.violet500} stopOpacity={0.32} />
          <stop offset="0.55" stopColor={nocturne.violet600} stopOpacity={0.08} />
          <stop offset="1" stopColor={nocturne.violet600} stopOpacity={0} />
        </radialGradient>
      </defs>
      <rect width={COVER_W} height={COVER_H} fill={nocturne.ink900} />
      <rect width={COVER_W} height={COVER_H} fill="url(#glow)" />
      {art.shapes.map((shape, i) =>
        shape.kind === "path" ? (
          <path
            key={i}
            d={shape.d}
            fill="none"
            stroke={OG_STROKE[shape.tone]}
            strokeOpacity={shape.opacity ?? 1}
            strokeWidth={shape.width * 0.3}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <circle key={i} cx={shape.cx} cy={shape.cy} r={shape.r} {...ogCircleProps(shape)} />
        ),
      )}
    </svg>
  );
}
