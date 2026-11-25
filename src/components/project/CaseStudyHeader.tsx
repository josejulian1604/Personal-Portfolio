import type { CSSProperties } from "react";
import Link from "next/link";
import type { Project } from "@/content/types";
import { projectLinkList } from "@/lib/projects";
import { ArrowLeftIcon } from "@/components/ui/icons";
import { PrivateNote, ProjectLinks } from "./ProjectLinks";

/** Same staggered CSS entrance as the hero, so the LCP text never waits for JS. */
const enter = (step: number): CSSProperties => ({ animationDelay: `${step * 60}ms` });
const enterClass = "motion-safe:animate-rise";

export function CaseStudyHeader({ project }: { project: Project }) {
  const { title, tagline, type, links } = project;

  return (
    <header>
      <Link
        href="/#projects"
        className="group -ml-2 inline-flex min-h-11 items-center gap-2 rounded-full px-2 text-small text-fg-muted transition-colors duration-(--duration-hover) hover:text-fg"
      >
        <ArrowLeftIcon className="size-4 transition-transform duration-(--duration-hover) group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
        All projects
      </Link>

      <p
        className={`mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 mono-label text-fg-subtle md:mt-14 ${enterClass}`}
        style={enter(0)}
      >
        <span className="text-accent">Case study</span>
        <span aria-hidden="true">/</span>
        <span>{type}</span>
      </p>

      <h1 className={`mt-5 max-w-[20ch] text-title text-fg ${enterClass}`} style={enter(1)}>
        {title}
      </h1>

      <p className={`mt-6 max-w-[48ch] text-lead text-fg-muted ${enterClass}`} style={enter(2)}>
        {tagline}
      </p>

      {links === "private" ? (
        <div className={`mt-8 ${enterClass}`} style={enter(3)}>
          <PrivateNote />
        </div>
      ) : projectLinkList(links).length > 0 ? (
        <div className={`mt-8 ${enterClass}`} style={enter(3)}>
          <ProjectLinks links={links} variant="buttons" />
        </div>
      ) : null}
    </header>
  );
}
