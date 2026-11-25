import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/ui/icons";

/** "https://www.github.com/user" → "github.com/user". */
const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const rowClasses = cn(
  "group flex min-h-11 items-center justify-between gap-6 border-b border-border py-6 md:py-8",
  "transition-colors duration-(--duration-hover)",
);

function RowContent({ label, detail, external }: { label: string; detail: string; external: boolean }) {
  const Icon = external ? ArrowUpRightIcon : ArrowRightIcon;
  return (
    <>
      <span className="min-w-0">
        <span className="block text-h2 text-fg transition-colors duration-(--duration-hover) group-hover:text-accent-hover">
          {label}
        </span>
        <span className="mt-2 block font-mono text-small [overflow-wrap:anywhere] text-fg-muted">{detail}</span>
      </span>
      <Icon
        className={cn(
          "size-7 shrink-0 text-fg-subtle transition-[translate,color] duration-(--duration-hover) md:size-9",
          "group-hover:text-accent-hover",
          external
            ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:translate-x-0.5",
          "motion-reduce:group-hover:translate-0",
        )}
      />
    </>
  );
}

/** Closing section: three large, direct links. No form, no backend. */
export function Contact() {
  const { email, linkedin, github } = profile.contact;

  const links: { label: string; href: string; detail: string; external: boolean }[] = [
    { label: "Email", href: `mailto:${email}`, detail: email, external: false },
    { label: "LinkedIn", href: linkedin, detail: displayUrl(linkedin), external: true },
    { label: "GitHub", href: github, detail: displayUrl(github), external: true },
  ];

  const item = (link: (typeof links)[number]): ReactNode =>
    link.external ? (
      <ExternalLink href={link.href} hideIcon className={rowClasses}>
        <RowContent label={link.label} detail={link.detail} external />
      </ExternalLink>
    ) : (
      <a href={link.href} className={rowClasses}>
        <RowContent label={link.label} detail={link.detail} external={false} />
      </a>
    );

  return (
    <Section id="contact" index={5} label="Contact" heading="Get in touch" className="border-t border-border">
      <ul className="border-t border-border">
        {links.map((link, index) => (
          <li key={link.label}>
            <Reveal index={index}>{item(link)}</Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
