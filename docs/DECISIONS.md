# Architecture Decisions

Log of decisions made and why. Add a new entry per decision — don't
edit past entries except to mark them superseded.

## 2026-09-15 — Content as typed data files, not a CMS

**Decision**: Portfolio content (projects, bio, skills) lives as typed
TypeScript data in `src/content/`, not in a headless CMS.

**Why**: Content volume is small (a handful of projects) and changes
infrequently. A typed data file gives compile-time safety and zero
runtime/hosting overhead compared to a CMS, at this scale.

## 2026-09-15 — Hybrid model for the Projects section

**Decision**: Projects show as a card grid on the home page (name,
stack, screenshot, short blurb). Each card links to its own
`/projects/[slug]` page with the full case study.

**Why**: A single scrolling page doesn't scale past a handful of
projects and buries the "quick scan" a recruiter needs in the first
seconds. A pure multi-page structure with no grid loses that quick
overview. The hybrid gives both: fast scan on the home page, depth on
demand, and each project gets its own indexable, shareable URL.

**Alternatives considered**: single-page scroll (rejected — doesn't
scale); multi-page only, no home grid (rejected — loses quick overview).

## 2026-09-15 — Contact via direct links, no backend

**Decision**: Contact section uses direct links (mailto, LinkedIn,
GitHub) instead of a functional contact form.

**Why**: No backend/email service to maintain, matches a static-first
Next.js deploy on Vercel, and is enough for a portfolio's actual use
case (a recruiter reaching out via email or LinkedIn).

## 2026-09-15 — No tag/filter UI in v1 (proposed: keep `tags` in the data schema anyway)

**Decision**: No filtering/tag UI in the Projects section for v1.

**Proposed addition**: even without the UI, give each project entry in
`src/content/` a `tags: string[]` field from the start. Costs nothing
now, and avoids a migration through every existing project entry later
if filtering gets added.

*(Adopted on 2026-11-23: see "`tags` field adopted in the project
schema" below.)*

## 2026-09-15 — English-only content

**Decision**: All portfolio copy is in English. Even though our conversations are in Spanish

**Why**: Matches the target audience (technical recruiters) and the
CLAUDE.md convention that all documentation, code, and commits are in
English.

## 2026-09-15 — Responsive design

**Decision**: The portfolio must be designed with responsiveness (monitors, cell phones, etc.)

**Why**: We don't know from where are people going to access this portfolio.

## 2026-11-23 — Nocturne design tokens

**Decision**: The site uses a dark, violet-accented palette called "Nocturne". It is built
as three token layers (primitive → semantic → component) in `src/app/globals.css`. Semantic
tokens are exposed through the Tailwind v4 `@theme`, so utilities like `bg-surface` and
`text-fg-muted` work, and the default Tailwind palette and font-size scale are removed.
Components never use raw hex. Final values:

| Primitive | Value | Semantic role | Contrast on ground (`#0B0A10`) |
|---|---|---|---|
| `--ink-950` | `#0B0A10` | `bg` (ground) | — |
| `--ink-900` | `#121019` | `surface` | — |
| `--ink-850` | `#18151F` | `surface-raised` | — |
| `--ink-800` | `#24202D` | `border` (hairline, decorative) | 1.24:1 |
| `--ink-700` | `#322C3F` | `border-strong` (decorative) | 1.47:1 |
| `--ink-600` | `#615A73` | `border-control` (ghost button outline) | 3.02:1 |
| `--mist-50` | `#F4F2F8` | `fg` | 17.75:1 |
| `--mist-300` | `#A9A3B8` | `fg-muted` | 8.09:1 |
| `--mist-500` | `#847E95` | `fg-subtle` (captions and labels only) | 5.07:1 |
| `--violet-300` | `#C4B5FD` | `accent-hover` | 10.68:1 |
| `--violet-400` | `#A78BFA` | `accent` (accent text, primary fill) | 7.24:1 |
| `--violet-500` | `#8B5CF6` | `ring`, `glow`, `accent-pressed` | 4.66:1 |
| `--violet-600` | `#7C3AED` | `glow-deep` (outer glow stop) | — |

Primary buttons use dark text (`accent-fg` = `--ink-950`) on the violet fill: 7.24:1 by
default, 10.68:1 on hover and 4.66:1 when pressed. The full table is in `docs/BRAND.md`.

**Why**: Dark with a single violet accent reads as premium and technical for the target
audience. The ratios were computed (WCAG 2.x relative luminance), not estimated: body text is
≥ 16:1, muted text is ≥ 7:1 on every surface, and the focus ring is ≥ 3:1. `globals.css` is the
single token source, per Tailwind v4 and the "no ad-hoc CSS files" convention. The
brand/design-system sync scripts are not used because they would create duplicate token files.

**Deviations from the draft plan**: `--ink-600` was added so the ghost button outline meets
3:1. The pressed state uses violet-500 instead of violet-600, because dark text on violet-600
falls below 4.5:1. Violet-600 is kept as the deep glow stop.

## 2026-11-23 — `motion` for animation

**Decision**: Animation uses the `motion` package (`motion/react`) and stays subtle. It is
loaded only in client islands (`Reveal`, `LoopMotif`, the `MotionConfig` provider). Only
`transform`, `opacity` and SVG `pathLength`/`pathOffset` are animated. Shared easing and
durations live in `src/lib/motion.ts` and mirror the CSS tokens. Reduced motion is respected
in three places: `<MotionConfig reducedMotion="user">`, explicit `useReducedMotion()` checks
(the hero loop is fully static), and a CSS `prefers-reduced-motion` guard.

**Why**: A declarative API with `whileInView`/`once` and pausable imperative controls, which
the hero loop needs so it can pause off-screen. The hero text uses a server-rendered CSS
entrance instead of `Reveal`, so the LCP text never waits for hydration.

**Alternatives considered**: GSAP (the ui-ux-pro-max presets). Rejected in favor of `motion`.
Its stagger timings are kept as reference values.

*(Partly superseded on 2026-11-23: scroll reveals no longer use `motion`; see "Scroll reveals in
CSS with one IntersectionObserver" below. `motion` remains for the hero loop only.)*

## 2026-11-23 — Inter + JetBrains Mono via next/font

**Decision**: Inter (variable) for all reading text and JetBrains Mono (variable) for small
metadata only (section indices, dates, tags). Both are loaded with `next/font/google`
(`display: "swap"`, latin subset) and exposed as CSS variables mapped to `--font-sans` and
`--font-mono` in `@theme`. They replace the template's Geist fonts.

**Why**: Self-hosted at build time (no request to Google at runtime), no layout shift thanks
to the automatic fallback metrics, and two families at most (banner-design rule).

## 2026-11-23 — Hand-built Tailwind components, no shadcn/ui

**Decision**: UI components (LinkButton, Tag, Monogram, ExternalLink, the header and the
mobile menu) are hand-built with Tailwind utilities and component tokens. shadcn/ui and Radix
are not used.

**Why**: The site needs only a handful of simple, non-form components. Hand-built components
keep the bundle small and the styling fully on Nocturne tokens. The one complex interaction
(the mobile menu's focus handling) is small enough to implement and test directly.

## 2026-11-23 — PORTFOLIO-CONTENT.md is the content source of truth

**Decision**: `docs/PORTFOLIO-CONTENT.md` is the only source of site copy. `src/content/*.ts`
transcribes it verbatim into typed data. The only transformation is dropping the trailing
period from case-study section headings ("Problem." becomes "Problem"). Only UI chrome (nav
labels, button labels, section labels, "opens in new tab") is written outside it.

**Why**: Keeps the copy reviewable in one place and prevents invented metrics, dates, links or
features. `PROJECT.md` and `TASKS.md` were stale (they listed CV Parser and Agro Hawk) and have
been corrected to match it.

## 2026-11-23 — `tags` field adopted in the project schema

**Decision**: Each `Project` in `src/content/projects.ts` has `tags: string[]`. The tags are
derived only from the project's Type and the stack/topic words already in the content file.
There is still no filter UI in v1. This resolves the 2026-09-15 proposal.

**Why**: Costs nothing now and avoids a migration through every project entry if filtering is
added later.

## 2026-11-23 — Dark only, no theme toggle

**Decision**: The site ships a single dark theme (`color-scheme: dark`), with no light mode
and no toggle.

**Why**: Nocturne is designed as a dark identity. One theme halves the contrast verification
work and removes a client-side toggle and its flash-of-wrong-theme risk.

## 2026-11-23 — `TODO` links are hidden

**Decision**: Project links marked `TODO` in the content file are omitted from the data, so
nothing renders for them. There are no placeholder or disabled links. `Links: private` renders
a "Private — internal" note and `Links: none` renders nothing.

**Why**: Broken or placeholder links hurt credibility with recruiters more than a missing link
does. Real URLs are added to `src/content/projects.ts` as José supplies them.

## 2026-11-23 — Shared shell in the root layout, root-relative nav anchors

**Decision**: SkipLink, SiteHeader, `<main id="main">` and SiteFooter render once in
`src/app/layout.tsx`, so the home page, case studies and the 404 share them. Nav items are
root-relative (`/#about`), and the monogram links to `/`.

**Why**: On the home page `/#about` is a plain in-page jump (same document, only the fragment
differs). From a case study the same link goes home and scrolls to the section. One header with
no per-route variants.

## 2026-11-23 — Section numbering follows the nav; section headings are UI chrome

**Decision**: Only the five nav sections carry an index ("01 / About" … "05 / Contact"). Currently
and Credentials are unnumbered (a violet dot replaces the number), so the numbers always match
the nav. The h2 texts ("How I work", "Where I've worked", "Selected projects", "Tools and
practices", "Education and certifications", "Get in touch") are UI chrome. They label a section
and make no claim beyond the content file.

**Why**: Numbering Currently or Credentials would break the match with the nav. Repeating the
label as the heading ("About / About") reads as filler.

## 2026-11-23 — Generated project covers, seeded by slug

**Decision**: Until screenshots exist, each project cover is line art generated by
`src/lib/cover-art.ts`. The slug seeds a small PRNG that picks one of six families (orbits,
waves, network, loop, bars, rays) and their parameters. A salt is chosen so the six current
projects land on six different families. The function returns plain shape data, rendered as
inline SVG with Nocturne utilities in `<ProjectCover>` and with literal colors in the OG images.
A supplied `cover: ImageRef` replaces the art via `next/image`. The art is `aria-hidden`: the
title names the project.

**Why**: Deterministic, so builds are stable. There is no image weight and no layout shift, and
the six covers are distinct but cohesive. One data source keeps the cards, case-study pages and
share images consistent.

## 2026-11-23 — Project cards are one link, named by the title

**Decision**: The whole card is a single `<Link>` with `aria-labelledby` (title) and
`aria-describedby` (tagline), and it contains no nested interactive elements. Stack tags show
the first four plus "+n" (with sr-only "more"). The full stack is on the case study. Hover gives a
2px lift and a brighter border. The cursor spotlight comes from one delegated `pointermove`
listener (`SpotlightGroup`) that writes CSS variables, only for `(hover: hover) and (pointer:
fine)`, and it is hidden under reduced motion. The case-study pager wraps around, so every page
has a previous and a next link.

**Why**: Screen readers announce a short, meaningful link name instead of every text node, and the
card focus ring follows the card's rounded corners. Writing CSS variables avoids re-rendering on
mouse move.

## 2026-11-23 — Scroll reveals in CSS with one IntersectionObserver

**Decision**: `<Reveal>` is now a server component that only renders `data-reveal` and a
`--reveal-delay`. The 600ms fade and 14px rise are CSS transitions in `globals.css`. One client
island in the root layout, `<RevealObserver>`, adds `data-revealed` on first view and then stops
watching (once per element), and it re-runs after client navigation. `motion` and
`<MotionConfig>` are now loaded only around the hero `LoopMotif`. Reduced motion shows reveal
content immediately (CSS guard), and `<noscript>` shows it without JS.

**Why**: With about 30 `motion` reveal islands, home-page hydration ran before first paint, and
Lighthouse's simulated mobile LCP was 3.0 s (Performance 94), although the observed LCP was 0.3 s.
After the change, mobile LCP is 0.9 s and Performance is 100. The look and timing are unchanged.

## 2026-11-23 — Hero grain as inline SVG

**Decision**: The film-grain overlay is an inline `<svg>` with an `feTurbulence` filter
(`<Grain>`), no longer a CSS `background-image` utility.

**Why**: A full-section background image is a Largest Contentful Paint candidate, and Lighthouse
measured the grain as the hero's LCP element. Inline SVG shapes are not LCP candidates.

## 2026-11-23 — Open Graph images with next/og

**Decision**: `src/app/opengraph-image.tsx` (home) and `src/app/projects/[slug]/opengraph-image.tsx`
(one per case study, statically generated) render 1200×630 PNGs with a 72px safe margin,
Inter + JetBrains Mono only, and text on the ink ground at AA or better. Case studies reuse the
project's generated cover art behind an ink scrim. Fonts are TTF subsets (only the glyphs in the
image) fetched from Google Fonts at build time with `cache: "force-cache"`. next/og needs TTF,
OTF or WOFF, and `next/font` does not expose those. If the fetch fails (offline build), the image
falls back to next/og's bundled font instead of failing the build. Satori cannot read CSS
variables, so `src/lib/tokens.ts` mirrors the Nocturne primitives as literals for OG images and
`themeColor` only.

**Why**: Branded, per-page share cards with no image assets to maintain. The fallback keeps
offline builds working.

## 2026-11-23 — Canonical URL source and icon

**Decision**: `siteUrl` is `NEXT_PUBLIC_SITE_URL`. On Vercel it falls back to the project's
production domain (`VERCEL_PROJECT_PRODUCTION_URL`), and locally to localhost. It feeds
`metadataBase`, canonical links, the sitemap and robots. Every page sets its own canonical,
Open Graph and Twitter fields through `lib/seo.ts`, because metadata merges shallowly. The
template's `favicon.ico` (the Vercel mark) is replaced by `src/app/icon.svg`, the JG monogram in
Nocturne.

**Why**: Avoids shipping localhost canonicals if the env var is forgotten on Vercel, and makes the
browser tab on-brand.

## 2026-11-25 — Profile photo lives in the About rail, not the hero

**Decision**: `profile.photo` (`public/images/profile.jpg`, 1000×1500) is rendered with
`next/image` at the top of the About section's side rail, above the facts list. It is cropped
to 4:5 (`object-[50%_30%]`, biased toward the face), rounded `2xl` like the cards, and outlined
with `border-border`. The hero keeps the loop motif. If `photo` is omitted, the rail shows only
the facts.

**Why**: The hero's text is the LCP element and paints without waiting for hydration; a photo
there would become the LCP candidate and compete with the name and CTAs. The About section is
where a recruiter looks for the person behind the work. The border stops the low-key, black-
background portrait from dissolving into the ink ground.

## 2026-11-25 — Internal HatchWorks projects are described at the pattern level

**Decision**: Breeder's Desk and the GenDD Intake Agent are internal company work, so their
case studies drop anything confidential: client names, the client's data sources and formats,
internal artifact names, the product's business purpose, exact security and IAM configuration
(auth mechanism, service-account layout), counts of tools/services, and roadmap hints (what is a
placeholder, what is still missing). They keep the tech stack, the architectural patterns
(deterministic engine decides, agent explains, validator, human-in-the-loop, event-driven
pipeline with dead-lettering and least privilege) and how I work with agents.

**Why**: The portfolio is public. It must show the engineering without disclosing client or
company information.

## 2026-11-25 — What stays out of the public repo

**Decision**: The repo is public, so `.gitignore` excludes `docs/PORTFOLIO-CONTENT.md` (the
private content source), `.vscode/` and `.claude/settings.local.json` (local editor and agent
config), and local tooling output (Playwright, Lighthouse, AppMap). `src/content/projects.ts`
stays tracked: the site imports it, Vercel builds from GitHub, and its redacted text is already
public on the site.

**Why**: Keeps private source material and machine-specific config off GitHub without breaking
the build or the Vercel deploy.
