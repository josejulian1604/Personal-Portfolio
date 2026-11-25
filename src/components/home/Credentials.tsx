import { certifications, education, recognition } from "@/content/credentials";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Airy section: Education · Certifications · Recognition in three columns.
 * Not in the nav, so it has no index number (keeps the nav numbering intact).
 */
export function Credentials() {
  const columns: {
    title: string;
    items: { key: string; primary: string; secondary: string; meta: string; detail?: string }[];
  }[] = [
    {
      title: "Education",
      items: education.map((entry) => ({
        key: entry.institution,
        primary: entry.institution,
        secondary: entry.credential,
        meta: [entry.period, entry.location].filter(Boolean).join(" · "),
      })),
    },
    {
      title: "Certifications",
      items: certifications.map((entry) => ({
        key: entry.name,
        primary: entry.name,
        secondary: entry.issuer,
        meta: entry.date,
      })),
    },
    {
      title: "Recognition",
      items: recognition.map((entry) => ({
        key: entry.title,
        primary: entry.title,
        secondary: entry.event,
        meta: entry.date,
        detail: entry.description,
      })),
    },
  ];

  return (
    <Section id="credentials" label="Credentials" heading="Education and certifications">
      <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {columns.map((column, index) => (
          <Reveal key={column.title} index={index}>
            <h3 className="border-b border-border pb-4 mono-label text-fg-muted">{column.title}</h3>
            <ul className="divide-y divide-border">
              {column.items.map((item) => (
                <li key={item.key} className="py-5">
                  <p className="text-body font-medium text-fg">{item.primary}</p>
                  <p className="mt-1 text-body text-fg-muted">{item.secondary}</p>
                  <p className="mt-2 mono-label text-fg-subtle">{item.meta}</p>
                  {item.detail ? <p className="mt-3 text-body text-fg-muted">{item.detail}</p> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
