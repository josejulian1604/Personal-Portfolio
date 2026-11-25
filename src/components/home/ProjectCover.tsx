import Image from "next/image";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { COVER_H, COVER_W, coverArt, type CoverShape, type CoverTone } from "@/lib/cover-art";

interface ProjectCoverProps {
  project: Pick<Project, "slug" | "cover">;
  /** Responsive `sizes` for a supplied screenshot. */
  sizes: string;
  /** Preload a supplied screenshot (above-the-fold use only). */
  preload?: boolean;
  className?: string;
}

const STROKE: Record<CoverTone, string> = {
  grid: "stroke-border",
  track: "stroke-border-strong",
  line: "stroke-accent",
  accent: "stroke-accent",
  hot: "stroke-accent-hover",
};

const FILL: Record<Extract<CoverShape, { kind: "circle" }>["fill"], string> = {
  node: "fill-accent-hover",
  dot: "fill-border-strong",
  ring: "fill-surface stroke-accent",
};

/**
 * Project cover. Renders the supplied screenshot via next/image when
 * `project.cover` is set; otherwise deterministic generated art seeded by the
 * slug (see lib/cover-art.ts). The art is decorative: the card or page title
 * names the project, so the SVG is hidden from assistive tech.
 *
 * The parent sets the box (aspect ratio and rounding); the cover fills it.
 */
export function ProjectCover({ project, sizes, preload = false, className }: ProjectCoverProps) {
  if (project.cover) {
    const { src, alt, width, height } = project.cover;
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        preload={preload}
        className={cn("size-full object-cover", className)}
      />
    );
  }

  const art = coverArt(project.slug);
  const glowId = `cover-glow-${project.slug}`;

  return (
    <svg
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("size-full", className)}
    >
      <defs>
        <radialGradient
          id={glowId}
          gradientUnits="userSpaceOnUse"
          cx={art.glow.cx}
          cy={art.glow.cy}
          r={art.glow.r}
        >
          <stop offset="0" style={{ stopColor: "var(--color-glow)", stopOpacity: 0.32 }} />
          <stop offset="0.55" style={{ stopColor: "var(--color-glow-deep)", stopOpacity: 0.08 }} />
          <stop offset="1" style={{ stopColor: "var(--color-glow-deep)", stopOpacity: 0 }} />
        </radialGradient>
      </defs>
      <rect width={COVER_W} height={COVER_H} className="fill-surface" />
      <rect width={COVER_W} height={COVER_H} fill={`url(#${glowId})`} />
      {art.shapes.map((shape, i) =>
        shape.kind === "path" ? (
          <path
            key={i}
            d={shape.d}
            strokeWidth={shape.width}
            strokeOpacity={shape.opacity}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            className={cn("fill-none", STROKE[shape.tone])}
          />
        ) : (
          <circle
            key={i}
            cx={shape.cx}
            cy={shape.cy}
            r={shape.r}
            strokeWidth={shape.fill === "ring" ? 1.25 : undefined}
            vectorEffect="non-scaling-stroke"
            className={FILL[shape.fill]}
          />
        ),
      )}
    </svg>
  );
}
