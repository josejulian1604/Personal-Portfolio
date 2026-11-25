import type { NavItem } from "./types";

/**
 * Home page section anchors. Root-relative ("/#about") so the same header works
 * on case-study pages; on the home page they are plain in-page jumps.
 */
export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];

/** Path under /public to the resume PDF. The Resume button renders only when this is set. */
export const resumePath: string | null = null;

/**
 * Canonical site URL, used for metadataBase, canonical links, the sitemap and robots.
 * Set NEXT_PUBLIC_SITE_URL in the deploy environment. On Vercel, the project's
 * production domain is used when it is not set; locally it falls back to localhost.
 */
export const siteUrl: string =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
