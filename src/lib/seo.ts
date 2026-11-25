import type { Metadata } from "next";
import { profile } from "@/content/profile";

/** Default document title (home page) and the suffix for every other page. */
export const SITE_TITLE = `${profile.name} — Software Engineer`;
export const TITLE_TEMPLATE = `%s — ${profile.name}`;

/**
 * Open Graph and Twitter fields for one page. Metadata objects merge shallowly
 * across segments, so every page sets the full `openGraph` and `twitter` objects.
 * Images are not set here: the `opengraph-image.tsx` file convention adds them.
 */
export function socialMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: profile.name,
      locale: "en_US",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
