# Decisiones de diseño / arquitectura

Registro breve de decisiones importantes y por qué se tomaron.

## 2026-09-14 — Stack: Next.js + TypeScript + Tailwind CSS

Elegido por ser un framework React full-stack maduro, buen soporte SSR/SSG, y despliegue directo en Vercel sin configuración adicional.

## 2026-09-14 — Deploy en Vercel

Integración nativa con Next.js y con GitHub (deploy automático por push/PR), sin necesidad de configurar CI/CD propio.

## 2026-09-14 — Contenido del portafolio como datos en `src/content/`

Proyectos, experiencia, etc. se manejan como datos tipados en código en lugar de un CMS, para mantener el proyecto simple mientras no haya necesidad de que alguien no técnico edite el contenido.

## 2026-09-14 — Contexto de proyecto en `docs/`, separado de `CLAUDE.md`

`CLAUDE.md` se mantiene enfocado en stack/comandos/convenciones técnicas. El propósito del proyecto, objetivos y checklist de tareas viven en `docs/` para no inflar `CLAUDE.md` y para que el checklist de tareas se pueda actualizar frecuentemente sin tocar el archivo de contexto técnico.
