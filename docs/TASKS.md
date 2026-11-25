# Tasks

Three phases, each ending at a checkpoint that needs José's approval. Nothing
is committed without approval. Content comes only from
`docs/PORTFOLIO-CONTENT.md`.

## Phase 1 — Foundation, tokens, shell, hero

- [x] Initialize Next.js project (App Router, TypeScript, Tailwind)
- [x] `.claude/skills/README.md` (one paragraph per skill)
- [x] DECISIONS.md entries: Nocturne tokens, motion, fonts, hand-built
      components, content file as source of truth, `tags` adopted, dark only,
      TODO links hidden
- [x] PROJECT.md scope corrected to match the content file
- [x] TASKS.md rewritten to the three phases
- [x] `docs/BRAND.md` (Nocturne guideline)
- [x] Install `motion` and `@vercel/analytics` (run by José)
- [x] Design tokens + base styles in `src/app/globals.css` (contrast verified)
- [x] Inter + JetBrains Mono via `next/font/google` (Geist removed)
- [x] Typed content layer in `src/content/` (profile, experience, projects,
      skills, credentials, site), with a `tags` field on projects
- [x] Layout shell: SkipLink, Container, Section, SiteHeader (active-section
      highlight), MobileNav, SiteFooter
- [x] UI atoms: LinkButton, Tag, Monogram, ExternalLink, inline SVG icons
- [x] Hero + LoopMotif + Reveal + MotionConfig provider
- [x] Root metadata, `<Analytics />`, template page and unused `public/*.svg`
      removed
- [x] `npm run build` and `npm run lint` clean
- [ ] Checkpoint 1 (José): hero and nav at 360/768/1024/1440, contrast table,
      mobile menu keyboard demo

## Phase 2 — Home sections + case studies

- [x] Currently (HatchWorks role + focus, ZEEK)
- [x] About
- [x] Experience (timeline)
- [x] Projects: ProjectGrid, ProjectCard, ProjectCover (generated art seeded
      by slug)
- [x] Skills (grouped)
- [x] Credentials (Education, Certifications, Recognition)
- [x] Contact (email, LinkedIn, GitHub)
- [x] `/projects/[slug]` case study pages (static params, `dynamicParams =
      false`, metadata, sticky meta rail, prev/next pager)
- [x] `not-found` page (unknown slugs return 404)
- [x] Hero polish: location/role line stacks below `sm` (no dangling "·")
- [ ] Checkpoint 2 (José): full home page and all 6 case studies at three
      widths, plus a TODO-link audit

## Phase 3 — Polish, SEO, accessibility, performance

- [x] Metadata: title template, per-page descriptions and canonicals, Open
      Graph + Twitter, `metadataBase` from `NEXT_PUBLIC_SITE_URL` (Vercel
      production domain as fallback)
- [x] Open Graph images (home + per project), sitemap, robots, icon
- [x] Resume button wiring in header and mobile menu (`download`,
      `type="application/pdf"`); stays hidden while `resumePath` is `null`
- [x] Motion tuning (shared tokens, exit faster than enter, reveal once; CSS
      reveals with one observer)
- [x] Brand consistency checklist
- [x] Accessibility audit (axe on every page and width, full keyboard pass,
      reduced-motion check)
- [x] Performance audit (Lighthouse mobile + desktop, CLS, font loading)
- [ ] Vercel Analytics enabled in the Vercel dashboard (José, at deploy time)
- [ ] Deploy to Vercel (José)
- [ ] Checkpoint 3 (José): final report

## Waiting on José (any time)

- [x] Profile photo (`public/images/profile.jpg`, shown in the About rail)
- [ ] Logo, project screenshots (`public/images/projects/<slug>.*`, then add
      `cover` to the project in `src/content/projects.ts`)
- [ ] `public/resume.pdf` (then set `resumePath` in `src/content/site.ts`)
- [ ] Real repo/demo/live URLs to replace the `TODO` links
- [ ] Production domain for `NEXT_PUBLIC_SITE_URL`
