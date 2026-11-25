import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

/*
 * State table (design-system: states-and-variants). Colors are component tokens
 * from globals.css; contrast ratios are in docs/BRAND.md.
 *
 * | State          | primary bg / text                      | ghost bg / border / text                         |
 * |----------------|----------------------------------------|--------------------------------------------------|
 * | default        | accent (violet-400) / accent-fg 7.24:1 | transparent / border-control 3.02:1 / fg         |
 * | hover          | accent-hover (violet-300) / 10.68:1    | surface-raised / fg-subtle / fg                  |
 * | focus-visible  | default + 2px ring (violet-500), 2px offset (global :focus-visible)              |
 * | active         | accent-pressed (violet-500) / 4.66:1, 1px press  | surface / border-control / fg, 1px press |
 *
 * Hover styles only apply on hover-capable pointers (Tailwind v4 `hover:`),
 * so touch users never get stuck hover states. Min height 44px.
 */
const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-small font-medium " +
  "select-none touch-manipulation transition-[background-color,border-color,color,translate] " +
  "duration-(--duration-hover) ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-(--button-primary-bg) text-(--button-primary-fg) " +
    "hover:bg-(--button-primary-bg-hover) active:bg-(--button-primary-bg-active)",
  ghost:
    "border border-(--button-ghost-border) text-(--button-ghost-fg) " +
    "hover:border-(--button-ghost-border-hover) hover:bg-(--button-ghost-bg-hover) " +
    "active:bg-(--button-ghost-bg-active)",
};

interface LinkButtonProps extends Omit<ComponentPropsWithoutRef<"a">, "href" | "children"> {
  href: string;
  variant?: Variant;
  children: ReactNode;
}

/**
 * A link styled as a button. Internal routes use next/link; in-page anchors,
 * files and external URLs use a plain <a>.
 */
export function LinkButton({ href, variant = "primary", className, children, ...props }: LinkButtonProps) {
  const classes = cn(base, variants[variant], className);
  const isInternalRoute = href.startsWith("/") && props.download === undefined;

  if (isInternalRoute) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
