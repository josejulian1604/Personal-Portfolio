import type { ReactNode } from "react";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { projectLinkList } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { ProjectLinks } from "./ProjectLinks";

interface CaseStudyMetaProps {
  project: Project;
  className?: string;
}

/**
 * Project facts: Type, Period, Context, Stack and Links (only when real links
 * exist). A sticky rail beside the prose on large screens; a plain block above
 * the prose below `lg`.
 */
export function CaseStudyMeta({ project, className }: CaseStudyMetaProps) {
  const { type, period, context, stack, links } = project;

  const rows: { term: string; detail: ReactNode }[] = [
    { term: "Type", detail: <span className="text-body text-fg">{type}</span> },
    { term: "Period", detail: <span className="text-body text-fg">{period}</span> },
  ];
  if (context) rows.push({ term: "Context", detail: <span className="text-body text-fg">{context}</span> });
  rows.push({
    term: "Stack",
    detail: (
      <ul className="flex flex-wrap gap-2">
        {stack.map((item) => (
          <li key={item} className="max-w-full">
            <Tag>{item}</Tag>
          </li>
        ))}
      </ul>
    ),
  });
  if (projectLinkList(links).length > 0) {
    rows.push({ term: "Links", detail: <ProjectLinks links={links} variant="list" /> });
  }

  return (
    <aside aria-label="Project details" className={className}>
      <dl
        className={cn(
          "grid gap-6 rounded-2xl border border-border bg-surface p-6 sm:grid-cols-2 lg:grid-cols-1",
          "lg:sticky lg:top-[calc(var(--spacing-header)+2rem)]",
        )}
      >
        {rows.map(({ term, detail }) => (
          <div key={term} className={term === "Stack" || term === "Context" ? "sm:col-span-2 lg:col-span-1" : undefined}>
            <dt className="mono-label text-fg-subtle">{term}</dt>
            <dd className="mt-2">{detail}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
