# Project Overview

## Purpose

Personal portfolio website for José Julián Gutiérrez Badilla, showcasing
software engineering projects and professional experience.

## Target audience

Technical recruiters and hiring managers evaluating José for software
engineering roles. Content and copy should be written with this audience
in mind — clear technical context, no unexplained jargon, easy to scan.

## Scope (v1)

All copy comes from `docs/PORTFOLIO-CONTENT.md`, the single source of truth
for site content (see DECISIONS.md).

- **Sections** (home page, in order): Hero, Currently, About, Experience,
  Projects, Skills, Credentials (Education, Certifications, Recognition),
  Contact
- **Language**: English only
- **Projects section**: hybrid model — a card grid on the home page,
  each card linking to its own `/projects/[slug]` page with the full case
  study.
- **Contact**: direct links (mailto, LinkedIn, GitHub). No contact form,
  no backend.
- **Featured projects**: Breeder's Desk, GenDD Intake Agent — Event-Driven
  Pipeline, Portfolio Website, Pulse, RAG Japan Travel Chatbot,
  SIGAC. More can be added later — this is why project data lives in
  `src/content/`, not hardcoded in components (see CLAUDE.md conventions).

## Out of scope (v1)

Explicitly deferred, not forgotten:

- Tag/filter UI for projects by technology
- Blog / writing section
- CMS or database-backed content
- Contact form with backend/email service
- Light theme / theme toggle

The visual design system (Nocturne: voice, color, type, spacing, motion,
component states) is documented in `docs/BRAND.md`.

## Non-goals

This is a portfolio, not a blog or a SaaS product. Avoid scope creep
toward features that don't serve "recruiter evaluates José's work
quickly."
