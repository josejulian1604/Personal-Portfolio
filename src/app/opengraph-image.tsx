import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { loadOgFonts, OG_PADDING, OG_SIZE, OgFrame, OgLoop, OgMonogram, ogText } from "@/lib/og";
import { nocturne } from "@/lib/tokens";

export const alt = `${profile.name}: ${profile.headline}`;
export const size = OG_SIZE;
export const contentType = "image/png";

/** Home / site-wide share image: monogram + headline, name, hero line, loop motif. */
export default async function Image() {
  const { name, initials, headline, hero } = profile;
  const fonts = await loadOgFonts(`${name}${initials}${headline}${hero}agenthuman`);

  return new ImageResponse(
    (
      <OgFrame glowAt="80% 45%">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: OG_PADDING,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <OgMonogram initials={initials} />
            <div style={{ display: "flex", fontSize: 20, color: nocturne.violet400, ...ogText.mono }}>{headline}</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
            <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
              <div style={{ display: "flex", fontSize: 76, lineHeight: 1, letterSpacing: "-0.04em", ...ogText.display }}>
                {name}
              </div>
              <div style={{ display: "flex", marginTop: 28, fontSize: 28, lineHeight: 1.45, color: nocturne.mist300, ...ogText.body }}>
                {hero}
              </div>
            </div>
            {/* The node labels overflow the loop box; the margin keeps "human" inside the safe zone. */}
            <div style={{ display: "flex", marginRight: 80 }}>
              <OgLoop width={330} />
            </div>
          </div>

          <div style={{ display: "flex", height: 2, width: 96, backgroundColor: nocturne.violet500 }} />
        </div>
      </OgFrame>
    ),
    { ...size, fonts },
  );
}
