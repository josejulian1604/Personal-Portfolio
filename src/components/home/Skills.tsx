import { skills } from "@/content/skills";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Tag } from "@/components/ui/Tag";

/**
 * Dense section: one hairline-separated row per skill group.
 * Each Reveal wrapper is the direct `<div>` child of the `<dl>` that groups a
 * dt/dd pair, which keeps the definition list valid.
 */
export function Skills() {
  return (
    <Section
      id="skills"
      index={4}
      label="Skills"
      heading="Tools and practices"
      className="border-y border-border bg-surface"
    >
      <dl className="border-t border-border">
        {skills.map(({ group, items }, index) => (
          <Reveal
            key={group}
            index={Math.min(index, 4)}
            className="grid gap-3 border-b border-border py-6 md:grid-cols-12 md:gap-8"
          >
            <dt className="mono-label pt-1.5 text-fg-muted md:col-span-3">{group}</dt>
            <dd className="md:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <li key={item} className="max-w-full">
                    <Tag inset>{item}</Tag>
                  </li>
                ))}
              </ul>
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
