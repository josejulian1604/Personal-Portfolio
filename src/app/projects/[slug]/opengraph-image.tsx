import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { alpha, loadOgFonts, OG_PADDING, OG_SIZE, OgCoverArt, OgFrame, OgMonogram, ogText } from "@/lib/og";
import { getProject } from "@/lib/projects";
import { nocturne } from "@/lib/tokens";

export const alt = `Case study by ${profile.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** One image per case study, generated at build time. */
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

/**
 * Case-study share image: the project's generated cover art full-bleed, an ink
 * scrim on the left for contrast, then type, title, tagline and byline.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  const { title, tagline, type, period } = project;
  const eyebrow = `Case study / ${type}`;
  const byline = `${profile.name} · ${period}`;
  const fonts = await loadOgFonts(`${eyebrow}${title}${tagline}${byline}${profile.initials}`);

  return new ImageResponse(
    (
      <OgFrame glowAt="20% 30%">
        <OgCoverArt slug={slug} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: OG_SIZE.width,
            height: OG_SIZE.height,
            display: "flex",
            backgroundImage: `linear-gradient(90deg, ${nocturne.ink950} 0%, ${alpha(nocturne.ink950, 0.94)} 55%, ${alpha(nocturne.ink950, 0.5)} 78%, ${alpha(nocturne.ink950, 0.15)} 100%)`,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: OG_PADDING,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
            <div style={{ display: "flex", fontSize: 20, color: nocturne.violet400, ...ogText.mono }}>{eyebrow}</div>
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 60,
                lineHeight: 1.05,
                letterSpacing: "-0.035em",
                ...ogText.display,
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", marginTop: 24, maxWidth: 680, fontSize: 26, lineHeight: 1.45, color: nocturne.mist300, ...ogText.body }}>
              {tagline}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <OgMonogram initials={profile.initials} />
            <div style={{ display: "flex", fontSize: 18, color: nocturne.mist300, ...ogText.mono }}>{byline}</div>
          </div>
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
