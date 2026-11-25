import { profile } from "@/content/profile";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { Container } from "./Container";

const linkClasses =
  "inline-flex min-h-11 items-center gap-1 px-2 text-small text-fg-muted transition-colors " +
  "duration-(--duration-hover) hover:text-fg";

export function SiteFooter() {
  const { email, linkedin, github } = profile.contact;

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-small font-medium text-fg">{profile.name}</p>

        <ul className="-mx-2 flex flex-wrap items-center" aria-label="Contact links">
          <li>
            <a href={`mailto:${email}`} className={linkClasses}>
              Email
            </a>
          </li>
          <li>
            <ExternalLink href={linkedin} className={linkClasses}>
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={github} className={linkClasses}>
              GitHub
            </ExternalLink>
          </li>
        </ul>

        {/* Supported by the Portfolio Website project's stack in PORTFOLIO-CONTENT.md. */}
        <p className="mono-label text-fg-subtle">Built with Next.js &amp; Claude Code</p>
      </Container>
    </footer>
  );
}
