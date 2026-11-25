import { experience } from "@/content/experience";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/*
 * Dense section: a vertical timeline. Ongoing roles get a filled violet node
 * and their period reads "… – Present", so status is never color-only.
 */
export function Experience() {
  return (
    <Section
      id="experience"
      index={2}
      label="Experience"
      heading="Where I've worked"
      className="border-y border-border bg-surface"
    >
      <ol className="relative">
        {experience.map((entry, index) => {
          const ongoing = entry.period.endsWith("Present");
          const isLast = index === experience.length - 1;
          return (
            <li key={entry.company} className="relative pl-8 md:pl-10">
              {/* Rail segment + node (decorative). */}
              <span
                aria-hidden="true"
                className={cn("absolute top-2 left-[5px] w-px bg-border-strong", isLast ? "h-0" : "-bottom-2")}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1.5 left-0 size-[11px] rounded-full border",
                  ongoing ? "border-accent bg-accent" : "border-border-control bg-surface",
                )}
              />

              <Reveal
                index={index}
                className={cn("grid gap-4 lg:grid-cols-12 lg:gap-8", isLast ? "pb-0" : "pb-14 md:pb-16")}
              >
                <div className="lg:col-span-4">
                  <p className={cn("mono-label", ongoing ? "text-accent" : "text-fg-subtle")}>{entry.period}</p>
                  {entry.location ? <p className="mt-2 text-small text-fg-subtle">{entry.location}</p> : null}
                </div>

                <div className="lg:col-span-8">
                  <h3 className="text-h3 text-fg">{entry.company}</h3>
                  <p className="mt-1 text-body font-medium text-fg-muted">{entry.role}</p>
                  <p className="mt-4 max-w-prose text-body text-fg-muted">{entry.summary}</p>
                  {entry.highlights ? (
                    <ul className="mt-5 grid max-w-prose gap-3">
                      {entry.highlights.map((item) => (
                        <li key={item} className="flex gap-3 text-body text-fg-muted">
                          <span aria-hidden="true" className="mt-[0.8em] h-px w-3 shrink-0 bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
