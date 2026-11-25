import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /** Use on `surface` backgrounds: fills the tag with the page ground so it still reads as a chip. */
  inset?: boolean;
  className?: string;
}

/**
 * Non-interactive mono label for stack items and tags.
 * Keeps original casing (e.g. "all-MiniLM-L6-v2"), so no uppercase transform.
 * Long items wrap inside the chip instead of overflowing narrow screens.
 */
export function Tag({ children, inset = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-(--tag-border) px-2.5 py-1",
        inset ? "bg-(--tag-bg-inset)" : "bg-(--tag-bg)",
        "max-w-full font-mono text-label tracking-normal text-(--tag-fg)",
        className,
      )}
    >
      {children}
    </span>
  );
}
