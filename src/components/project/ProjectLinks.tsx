import type { ProjectLinks as ProjectLinksData } from "@/content/types";
import { cn } from "@/lib/cn";
import { projectLinkList } from "@/lib/projects";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowUpRightIcon, LockIcon } from "@/components/ui/icons";

interface ProjectLinksProps {
  links: ProjectLinksData;
  /** "buttons" for the case-study header, "list" for the meta rail. */
  variant: "buttons" | "list";
  className?: string;
}

/** Small note for internal work whose links cannot be shared. */
export function PrivateNote({ className }: { className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-small text-fg-muted", className)}>
      <LockIcon className="size-4 shrink-0 text-fg-subtle" />
      Private — internal
    </p>
  );
}

/**
 * Renders only links that exist in the data. `"private"`, `"none"` and `{}`
 * render nothing here (the header shows <PrivateNote> for `"private"`), so a
 * TODO or placeholder link can never reach the page.
 */
export function ProjectLinks({ links, variant, className }: ProjectLinksProps) {
  const list = projectLinkList(links);
  if (list.length === 0) return null;

  if (variant === "buttons") {
    return (
      <ul className={cn("flex flex-wrap gap-3", className)}>
        {list.map((link, index) => (
          <li key={link.key}>
            <LinkButton
              href={link.href}
              variant={index === 0 ? "primary" : "ghost"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
              <ArrowUpRightIcon className="size-4" />
              <span className="sr-only"> (opens in new tab)</span>
            </LinkButton>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("grid gap-1", className)}>
      {list.map((link) => (
        <li key={link.key}>
          <ExternalLink
            href={link.href}
            className="inline-flex min-h-11 items-center gap-1 text-body text-accent transition-colors duration-(--duration-hover) hover:text-accent-hover"
          >
            {link.label}
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
