import { cn } from "@/lib/cn";

interface MonogramProps {
  initials: string;
  className?: string;
}

/**
 * Typographic "JG" mark used until a logo is supplied. Decorative:
 * the surrounding link carries the accessible name.
 */
export function Monogram({ initials, className }: MonogramProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid size-9 place-items-center rounded-lg border border-border-strong bg-surface",
        "text-small font-semibold tracking-tight text-fg",
        className,
      )}
    >
      {initials}
      <span className="absolute -right-0.5 -bottom-0.5 size-1.5 rounded-full bg-accent" />
    </span>
  );
}
