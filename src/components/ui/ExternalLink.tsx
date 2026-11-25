import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRightIcon } from "./icons";

interface ExternalLinkProps extends Omit<ComponentPropsWithoutRef<"a">, "target" | "rel"> {
  href: string;
  /** Hide the trailing arrow icon (the sr-only hint is always kept). */
  hideIcon?: boolean;
}

/**
 * Link that opens in a new tab, with a visible arrow and an sr-only hint.
 * A `className` replaces the default inline layout (`inline-flex items-center gap-1`),
 * so callers fully own the link's layout without conflicting utilities.
 */
export function ExternalLink({ href, children, className, hideIcon = false, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "inline-flex items-center gap-1"}
      {...props}
    >
      {children}
      {hideIcon ? null : <ArrowUpRightIcon className="size-3.5 shrink-0" />}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
