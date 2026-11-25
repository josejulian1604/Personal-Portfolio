import type { ProjectSection } from "@/content/types";

interface CaseStudySectionProps {
  section: ProjectSection;
  /** 1-based position, shown as a decorative mono index. */
  index: number;
  /** Unique id prefix for the heading anchor. */
  id: string;
}

/** One prose section of a case study: heading, then body and/or bullets, in data order. */
export function CaseStudySection({ section, index, id }: CaseStudySectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h2 id={headingId} className="flex items-baseline gap-4 text-h3 text-fg">
        <span aria-hidden="true" className="mono-label text-accent">
          {String(index).padStart(2, "0")}
        </span>
        {section.heading}
      </h2>
      {section.body ? <p className="mt-4 max-w-prose text-body text-fg-muted">{section.body}</p> : null}
      {section.bullets ? (
        <ul className="mt-5 grid max-w-prose gap-3">
          {section.bullets.map((item) => (
            <li key={item} className="flex gap-3 text-body text-fg-muted">
              <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
