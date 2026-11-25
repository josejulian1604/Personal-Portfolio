import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";

/*
 * Dense band right under the hero. Built only from facts in the content file:
 * the current HatchWorks AI role with its focus areas, and every other role
 * whose period runs to "Present" (the ZEEK volunteer role).
 */
export function Currently() {
  const { currentRole, focus } = profile;
  const ongoing = experience.filter(
    (entry) => entry.period.endsWith("Present") && entry.company !== currentRole.company,
  );

  return (
    <section aria-labelledby="currently-heading" className="border-y border-border bg-surface">
      <Container className="grid gap-10 py-12 md:py-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-3">
          <h2 id="currently-heading" className="mono-label flex items-center gap-2 text-fg-subtle">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
            Currently
          </h2>
        </div>

        <ul className="grid gap-10 md:grid-cols-2 md:gap-8 lg:col-span-9">
          <li>
            <Reveal>
              <p className="mono-label text-fg-subtle">{currentRole.period}</p>
              <p className="mt-3 text-h3 text-fg">{currentRole.title}</p>
              <p className="mt-1 text-body text-fg-muted">{currentRole.company}</p>
              <ul aria-label="Focus" className="mt-5 flex flex-wrap gap-2">
                {focus.map((item) => (
                  <li key={item} className="max-w-full">
                    <Tag inset>{item}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
          {ongoing.map((entry, index) => (
            <li key={entry.company}>
              <Reveal index={index + 1}>
                <p className="mono-label text-fg-subtle">{entry.period}</p>
                <p className="mt-3 text-h3 text-fg">{entry.role}</p>
                <p className="mt-1 text-body text-fg-muted">{entry.company}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
