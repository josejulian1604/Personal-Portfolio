import { projects } from "@/content/projects";
import type { Project, ProjectLinkKey, ProjectLinks } from "@/content/types";

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectHref(slug: string): `/projects/${string}` {
  return `/projects/${slug}`;
}

/** Previous and next project in content order, wrapping around at the ends. */
export function getProjectNeighbors(slug: string): { previous: Project; next: Project } | null {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1 || projects.length < 2) return null;
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

/** UI labels for project link kinds. */
const LINK_LABELS: Record<ProjectLinkKey, string> = {
  repo: "Repository",
  demo: "Demo",
  live: "Live site",
};

const LINK_ORDER: ProjectLinkKey[] = ["live", "demo", "repo"];

/**
 * Real links only, in display order. "private", "none" and an empty object all
 * yield no links; empty strings are ignored so a placeholder can never render.
 */
export function projectLinkList(links: ProjectLinks): { key: ProjectLinkKey; label: string; href: string }[] {
  if (typeof links === "string") return [];
  return LINK_ORDER.flatMap((key) => {
    const href = links[key]?.trim();
    return href ? [{ key, label: LINK_LABELS[key], href }] : [];
  });
}
