# Personal Portfolio

Personal portfolio website, redesigned using Claude Code and agentic development.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- `motion` for the hero loop, `next/og` for share images
- Deploy: [Vercel](https://vercel.com)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (also type-checks; every case study is statically generated) |
| `npm run lint` | ESLint |

## Content and configuration

- All copy lives in `docs/PORTFOLIO-CONTENT.md` and is transcribed into typed data in
  `src/content/`. Components render that data; no copy is hardcoded in JSX.
- Project links are added in `src/content/projects.ts`. Only real URLs render.
- Screenshots: add a `cover` (`src`, `alt`, `width`, `height`) to a project to replace its
  generated cover art.
- Resume: put the PDF in `public/` and set `resumePath` in `src/content/site.ts` to show the
  Resume button.
- Set `NEXT_PUBLIC_SITE_URL` to the production URL for canonical links, the sitemap and Open Graph
  URLs (on Vercel, the project's production domain is used if it is not set).

## Development

This project uses Claude Code for agentic development. See [`CLAUDE.md`](./CLAUDE.md) for project
context and conventions, `docs/` for product context, design decisions and the Nocturne brand
guideline, and `.claude/skills/` for project-specific skills.
