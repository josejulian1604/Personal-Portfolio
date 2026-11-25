# Nocturne — Brand Guideline

A short guideline for the portfolio's look, voice and behavior. The token
source of truth is `src/app/globals.css` (Tailwind v4 `@theme`). This doc
explains it, and changes go there first. Decisions and rationale are in
`docs/DECISIONS.md`.

## Voice

All site copy comes verbatim from `docs/PORTFOLIO-CONTENT.md`. This section
governs UI chrome only (labels, buttons, alt text) and any future copy edits
José makes.

| Trait | Means | Do | Don't |
|---|---|---|---|
| Precise | Concrete technical facts | "Deterministic scoring engine computes pass/fail" | "Cutting-edge AI magic" |
| Calm | Confident, never hyped | "View projects" | "Check out my amazing work!" |
| Honest | Only claims the content supports | Name the real scope ("Infrastructure only") | Invent metrics, dates or features |
| Human-centered | People stay in control | "humans stay in the loop" | Calling the RAG chatbot "agentic" |

Naming is fixed: **GenDD** (Generative-Driven Development), **human-in-the-loop**,
**Claude Code**, **MCP**. UI chrome uses sentence case and short verbs.

## Color

Dark only. One accent (violet). Hairlines instead of shadows. Components use
semantic utilities (`bg-surface`, `text-fg-muted`, `border-border`) or component
tokens (`bg-(--button-primary-bg)`), never raw hex.

| Semantic token | Primitive | Hex | Use |
|---|---|---|---|
| `bg` | `--ink-950` | `#0B0A10` | Page ground |
| `surface` | `--ink-900` | `#121019` | Cards, tags |
| `surface-raised` | `--ink-850` | `#18151F` | Hover surfaces |
| `border` | `--ink-800` | `#24202D` | Hairlines (decorative) |
| `border-strong` | `--ink-700` | `#322C3F` | Stronger dividers (decorative) |
| `border-control` | `--ink-600` | `#615A73` | Outlines of interactive controls |
| `fg` | `--mist-50` | `#F4F2F8` | Body and headings |
| `fg-muted` | `--mist-300` | `#A9A3B8` | Secondary text, nav links |
| `fg-subtle` | `--mist-500` | `#847E95` | Captions and mono labels only |
| `accent` | `--violet-400` | `#A78BFA` | Accent text, links, primary fill |
| `accent-hover` | `--violet-300` | `#C4B5FD` | Hover text and hover fill |
| `accent-pressed` | `--violet-500` | `#8B5CF6` | Pressed fill |
| `accent-fg` | `--ink-950` | `#0B0A10` | Text on accent fills |
| `ring` / `glow` | `--violet-500` | `#8B5CF6` | Focus ring, hero glow |
| `glow-deep` | `--violet-600` | `#7C3AED` | Outer glow stop |

### Contrast (WCAG 2.x, computed)

Targets: body ≥ 7:1, any text ≥ 4.5:1, UI and focus ≥ 3:1.

| Pair | on `bg` | on `surface` | on `surface-raised` |
|---|---|---|---|
| `fg` | 17.75:1 | 16.97:1 | 16.21:1 |
| `fg-muted` | 8.09:1 | 7.74:1 | 7.39:1 |
| `fg-subtle` | 5.07:1 | 4.85:1 | 4.63:1 |
| `accent` | 7.24:1 | 6.93:1 | 6.62:1 |
| `accent-hover` | 10.68:1 | — | 9.76:1 |
| `ring` (non-text) | 4.66:1 | 4.45:1 | 4.25:1 |
| `border-control` (non-text) | 3.02:1 | — | — |

| Other pairs | Ratio |
|---|---|
| `accent-fg` on `accent` (primary button) | 7.24:1 |
| `accent-fg` on `accent-hover` (primary hover) | 10.68:1 |
| `accent-fg` on `accent-pressed` (primary active) | 4.66:1 |
| `fg` on `::selection` (violet-500 at 40%) | 10.70:1 |
| `fg-muted` on header (bg at 80%, over light content, worst case) | 4.75:1 |
| `fg-muted` on hero glow peak | 5.57:1 |

`border` (1.24:1) and `border-strong` (1.47:1) are decorative separators only,
never the sole indicator of an interactive control.

## Typography

Two families at most: **Inter** (variable) for all reading text and
**JetBrains Mono** (variable) for small metadata only. Both load through
`next/font/google` with `display: swap`. Inter uses `ss01` and `cv11`.

| Utility | Size | Line height | Tracking | Weight | Use |
|---|---|---|---|---|---|
| `text-display` | `clamp(2.75rem, 1.4rem + 5.6vw, 6rem)` | 1 | −0.04em | 600 | Hero `h1` |
| `text-title` | `clamp(2.25rem, 1.3rem + 3.6vw, 4.25rem)` | 1.04 | −0.035em | 600 | Case-study and 404 `h1` |
| `text-h2` | `clamp(2rem, 1.4rem + 2.4vw, 3.25rem)` | 1.08 | −0.03em | 600 | Section headings |
| `text-h3` | 1.5rem | 1.3 | −0.015em | 600 | Sub-headings |
| `text-lead` | `clamp(1.1875rem, 1rem + 0.8vw, 1.5rem)` | 1.5 | −0.01em | 400 | Hero line, intros |
| `text-body` | 1.0625rem | 1.65 | 0 | 400 | Default body |
| `text-small` | 0.875rem | 1.5 | 0 | 400–500 | Nav, buttons, footer |
| `mono-label` | 0.75rem | 1.4 | 0.08em, uppercase | 400 | Indices ("01 / About"), dates |
| `text-label` + `font-mono` | 0.75rem | 1.4 | normal | 400 | Tags (original casing) |

Headings use `text-wrap: balance` and paragraphs `text-wrap: pretty`. Prose
max width is `max-w-prose` (68ch). Body text is never below 16px.

## Spacing and layout

- 4px base (Tailwind `--spacing`). Low density.
- Section padding: `py-section` = `clamp(6rem, 4rem + 8vw, 10rem)`.
- Header height: `h-header` = 4rem. `scroll-padding-top` keeps anchors clear of it.
- Container: `max-w-page` (1200px), gutters 16px (base), 24px (`md`), 32px (`lg`+).
- Single column below `md`, 12-column grid from `lg`. No horizontal scroll from 360px.
- Touch targets are at least 44×44px (`min-h-11` / `size-11`), with at least 8px between them.

## Motion

Purposeful and subtle: reveal on first view, never on every scroll.

| Token | Value | Use |
|---|---|---|
| `--duration-hover` | 150ms | Hover and press color changes |
| `--duration-ui` | 250ms | Menus, indicators |
| `--duration-reveal` | 600ms | Section reveals (fade + 14px rise) |
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | All entrances |
| Stagger | 60ms | Siblings in a reveal group |

- Only `transform`, `opacity` and SVG `pathLength`/`pathOffset` animate. Nothing causes layout shift.
- Scroll reveals are CSS transitions on `[data-reveal]`, triggered once per element by one
  shared `RevealObserver` island. `motion` runs only in the hero `LoopMotif`, wrapped in
  `<MotionConfig reducedMotion="user">`.
- Hover-in uses 250ms and hover-out 150ms (exit faster than enter).
- Reduced motion turns off reveals, the hero entrance, the loop draw and pulse, and smooth scrolling.
- The hero and case-study headers use a CSS entrance so LCP never waits for JavaScript.
- Hero loop motif: draws once (1.8s), then a pulse laps it every 9s, paused off-screen.
- The card hover spotlight runs only for `(hover: hover) and (pointer: fine)` (the
  `pointer-fine:` variant) and is hidden under reduced motion.
- The grain overlay is an inline SVG filter (`<Grain>`), not a background image, so it is never
  measured as the LCP element.

## Component states

Focus is always visible: a 2px `ring` outline with a 2px offset, from the global
`:focus-visible` rule. Hover styles only apply on hover-capable pointers.

**LinkButton**

| State | Primary | Ghost |
|---|---|---|
| Default | `accent` fill, `accent-fg` text | Transparent, `border-control` outline, `fg` text |
| Hover | `accent-hover` fill | `surface-raised` fill, `fg-subtle` outline |
| Focus-visible | Default + ring | Default + ring |
| Active | `accent-pressed` fill, 1px press | `surface` fill, 1px press |

**Tag**: non-interactive. `surface` fill, `border` hairline, `fg-muted` mono text. On `surface`
bands, `inset` uses the page ground fill instead. Long items wrap inside the chip.

**ProjectCard** (one link per card, named by its title)

| State | Surface / border | Motion |
|---|---|---|
| Default | `surface` / `border` | — |
| Hover | Cursor spotlight (fine pointers) / `accent` mixed into `border-strong` | 2px lift, 250ms in, 150ms out |
| Focus-visible | Default + ring | — |
| Active | Hover colors | Lift released |

**Generated covers**: line art seeded by the project slug (`src/lib/cover-art.ts`): `surface`
ground, one violet glow, `border`/`border-strong` structure, `accent` line work and
`accent-hover` nodes. Decorative and `aria-hidden`.

**Open Graph images**: 1200×630, 72px safe margin, Inter + JetBrains Mono, ink ground with the
violet glow. Literal colors come from `src/lib/tokens.ts`, which mirrors the primitives above.

**Nav link**: `fg-muted` by default, `fg` on hover. The active section is `fg`
with a 1px `accent` underline and `aria-current="location"`.

**ExternalLink**: arrow icon plus the sr-only text "(opens in new tab)".

**Mobile menu**: toggle with `aria-expanded`/`aria-controls`. Focus moves to the
first link on open and Tab cycles within the menu. Esc closes it and returns focus
to the toggle. Page scroll is locked while it is open.
