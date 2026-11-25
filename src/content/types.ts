/**
 * Content schema. All values are transcribed verbatim from
 * docs/PORTFOLIO-CONTENT.md, which is the only source of truth for site copy.
 */

export interface ImageRef {
  /** Path under /public, e.g. "/images/profile.jpg". */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CurrentRole {
  title: string;
  company: string;
  period: string;
}

export interface SpokenLanguage {
  language: string;
  level: string;
}

export interface ContactLinks {
  email: string;
  linkedin: string;
  github: string;
}

export interface Profile {
  name: string;
  /** Initials used by the Monogram until a logo is supplied. */
  initials: string;
  headline: string;
  location: string;
  currentRole: CurrentRole;
  focus: string[];
  languages: SpokenLanguage[];
  hero: string;
  about: string;
  contact: ContactLinks;
  /** Portrait shown in the About section; omit to hide it. */
  photo?: ImageRef;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights?: string[];
}

export type ProjectLinkKey = "repo" | "demo" | "live";

/**
 * - object: only links with a real URL are present (`TODO` links are omitted)
 * - "private": internal work; render a "Private — internal" note
 * - "none": render nothing
 */
export type ProjectLinks = Partial<Record<ProjectLinkKey, string>> | "private" | "none";

export interface ProjectSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  period: string;
  type: string;
  context?: string;
  stack: string[];
  /** Derived only from the project's Type, stack and topic words. No filter UI in v1. */
  tags: string[];
  links: ProjectLinks;
  /** Case-study sections, in the order they appear in the content file. */
  sections: ProjectSection[];
  /** Undefined until a screenshot is supplied; generated cover art is used instead. */
  cover?: ImageRef;
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export interface EducationEntry {
  institution: string;
  credential: string;
  period: string;
  location?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface RecognitionEntry {
  title: string;
  event: string;
  date: string;
  description: string;
}

export interface NavItem {
  label: string;
  /** Root-relative anchor to a home page section, e.g. "/#about". */
  href: `/#${string}`;
}
