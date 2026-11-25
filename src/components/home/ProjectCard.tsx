import Link from "next/link";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { projectHref } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { ArrowRightIcon } from "@/components/ui/icons";
import { ProjectCover } from "./ProjectCover";

/** How many stack items the card shows before collapsing the rest into "+n". */
const VISIBLE_STACK = 4;

/*
 * State table (design-system: states-and-variants). Tokens live in globals.css.
 *
 * | State         | Surface / border                         | Motion                         |
 * |---------------|------------------------------------------|--------------------------------|
 * | default       | card-bg (surface) / card-border          | —                              |
 * | hover         | + cursor spotlight / card-border-hover   | 2px lift, 250ms in, 150ms out  |
 * | focus-visible | default + 2px ring, 2px offset (global)  | —                              |
 * | active        | hover colors                             | lift released (pressed)        |
 *
 * Hover styles only apply on hover-capable pointers; the spotlight only on
 * fine pointers, and neither lift nor spotlight runs under reduced motion.
 * The whole card is one link. Its accessible name is the title and its
 * description the tagline, instead of every text node in the card.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { slug, title, tagline, type, period, stack } = project;
  const titleId = `project-${slug}-title`;
  const taglineId = `project-${slug}-tagline`;
  const shown = stack.slice(0, VISIBLE_STACK);
  const hidden = stack.length - shown.length;

  return (
    <Link
      href={projectHref(slug)}
      data-spotlight=""
      aria-labelledby={titleId}
      aria-describedby={taglineId}
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border",
        "border-(--card-border) bg-(--card-bg)",
        "transition-[translate,border-color] duration-(--duration-hover) ease-out-quint",
        "hover:-translate-y-0.5 hover:border-(--card-border-hover) hover:duration-(--duration-ui)",
        "active:translate-y-0 motion-reduce:hover:translate-y-0",
      )}
    >
      {/* Cursor spotlight (decorative). */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-10 opacity-0 card-spotlight",
          "transition-opacity duration-(--duration-hover) pointer-fine:group-hover:opacity-100",
          "pointer-fine:group-hover:duration-(--duration-ui) motion-reduce:hidden",
        )}
      />

      <div className="aspect-[16/10] overflow-hidden border-b border-(--card-border)">
        <ProjectCover project={project} sizes="(min-width: 64rem) 368px, (min-width: 48rem) 50vw, 100vw" />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 mono-label text-fg-subtle">
          <span>{type}</span>
          <span>{period}</span>
        </p>

        <div className="mt-3 flex items-start justify-between gap-4">
          <h3 id={titleId} className="text-h3 text-fg">
            {title}
          </h3>
          <ArrowRightIcon
            className={cn(
              "mt-1.5 size-5 shrink-0 text-fg-subtle transition-[translate,color] duration-(--duration-hover)",
              "group-hover:translate-x-0.5 group-hover:text-accent motion-reduce:group-hover:translate-x-0",
            )}
          />
        </div>

        <p id={taglineId} className="mt-3 text-body text-fg-muted">
          {tagline}
        </p>

        <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-2 pt-6">
          {shown.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
          {hidden > 0 ? (
            <li>
              <Tag>
                +{hidden}
                <span className="sr-only"> more</span>
              </Tag>
            </li>
          ) : null}
        </ul>
      </div>
    </Link>
  );
}
