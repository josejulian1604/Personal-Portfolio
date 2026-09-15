@AGENTS.md

# Personal Portfolio

Personal portfolio website for José Julián Gutiérrez Badilla, showcasing projects and experience. Built with agentic development using Claude Code.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Deploy target: Vercel

## Commands

- `npm run dev` — start local dev server
- `npm run build` — production build (also type-checks)
- `npm run lint` — run ESLint

## Structure

- `src/app/` — routes (App Router)
- `src/components/` — reusable UI components
- `src/lib/` — utilities and helpers
- `src/content/` — portfolio data (projects, experience, etc.) as typed data, not a CMS
- `public/images/` — static image assets (project screenshots, profile photo, icons)

## Conventions

- TypeScript strict mode; avoid `any`.
- Prefer Server Components; mark Client Components with `"use client"` only when needed (interactivity, hooks).
- Style with Tailwind utility classes; avoid ad-hoc CSS files.
- Keep portfolio content (project list, bio, links) as data in `src/content/`, rendered by components — don't hardcode content into JSX.

## Project-specific skills

`.claude/skills/` holds skills specific to this repo (e.g. adding a new project entry, updating the experience section). Check there before writing a repetitive task by hand.

## Project context

`docs/` holds process/product context, separate from the technical conventions above:
- `docs/PROJECT.md` — purpose, target audience, scope
- `docs/TASKS.md` — checklist of pending/completed work
- `docs/DECISIONS.md` — log of design/architecture decisions and why they were made

Check `docs/TASKS.md` for current state before starting work, and update it as tasks are completed.
