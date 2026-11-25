"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/cn";

interface SectionNavProps {
  items: NavItem[];
}

/** "/#about" → "about". */
const sectionId = (href: NavItem["href"]) => href.slice(href.indexOf("#") + 1);

/**
 * Desktop section links with active-section highlight. An IntersectionObserver
 * marks the section crossing the middle band of the viewport as current.
 * On pages without these sections (case studies) nothing is highlighted.
 */
export function SectionNav({ items }: SectionNavProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const ids = items.map((item) => sectionId(item.href));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        setActiveId(ids.find((id) => visible.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Primary" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {items.map((item) => {
          const isActive = activeId === sectionId(item.href);
          return (
            <li key={item.href}>
              <a
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-full px-3 text-small",
                  "transition-colors duration-(--duration-hover) hover:text-fg",
                  isActive ? "text-fg" : "text-fg-muted",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-3 bottom-2 h-px origin-left bg-accent",
                    "transition-[scale,opacity] duration-(--duration-ui) ease-out-quint",
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
