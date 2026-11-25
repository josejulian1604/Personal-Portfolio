import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

interface SectionProps {
  /** Anchor id, matched by the nav (e.g. "about" for "/#about"). */
  id: string;
  /**
   * 1-based position in the nav, rendered as a zero-padded mono index ("01").
   * Omit for sections that are not in the nav, so the numbering always matches it.
   */
  index?: number;
  /** Short mono label next to the index ("About"). */
  label: string;
  heading: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Home page section: mono index label ("01 / About") + h2 heading + content. */
export function Section({ id, index, label, heading, children, className }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-section", className)}>
      <Container>
        <p className="mono-label text-fg-subtle">
          {index === undefined ? (
            <span aria-hidden="true" className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent" />
          ) : (
            <>
              <span className="text-accent">{String(index).padStart(2, "0")}</span>
              <span aria-hidden="true"> / </span>
              <span className="sr-only">, </span>
            </>
          )}
          {label}
        </p>
        <h2 id={headingId} className="mt-4 max-w-[22ch] text-h2 text-fg">
          {heading}
        </h2>
        <div className="mt-12 md:mt-16">{children}</div>
      </Container>
    </section>
  );
}
