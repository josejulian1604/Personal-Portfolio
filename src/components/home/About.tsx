import Image from "next/image";
import { profile } from "@/content/profile";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Airy section: the About paragraph as a large lead, with a side rail holding
 * the portrait (when supplied) and a small facts list.
 */
export function About() {
  const { about, location, languages, photo } = profile;

  const facts = [
    { term: "Location", detail: [location] },
    { term: "Languages", detail: languages.map(({ language, level }) => `${language} (${level})`) },
  ];

  return (
    <Section id="about" index={1} label="About" heading="How I work">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <p className="max-w-prose text-lead text-fg-muted">{about}</p>
        </Reveal>

        <Reveal index={1} className="lg:col-span-4 lg:col-start-9">
          {photo && (
            /* 4:5 crop of the 2:3 original, biased toward the face. The border keeps the
               low-key portrait from dissolving into the ink background. */
            <div className="mb-8 aspect-4/5 max-w-xs overflow-hidden rounded-2xl border border-border bg-surface lg:max-w-none">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 26rem, 20rem"
                className="size-full object-cover object-[50%_30%]"
              />
            </div>
          )}

          <dl className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
            {facts.map(({ term, detail }) => (
              <div key={term}>
                <dt className="mono-label text-fg-subtle">{term}</dt>
                {detail.map((line) => (
                  <dd key={line} className="mt-2 text-body text-fg">
                    {line}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
