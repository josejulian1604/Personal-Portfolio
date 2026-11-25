"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { NavItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { CloseIcon, DownloadIcon, MenuIcon } from "@/components/ui/icons";

interface MobileNavProps {
  items: NavItem[];
  resumePath: string | null;
}

const PANEL_ID = "mobile-nav-panel";
/** Matches Tailwind's `md` breakpoint, where the desktop nav takes over. */
const DESKTOP_QUERY = "(min-width: 48rem)";

/**
 * Disclosure menu for small screens.
 * - Toggle exposes aria-expanded / aria-controls.
 * - On open, focus moves to the first link; Tab cycles within toggle + links.
 * - Esc or the toggle closes and returns focus to the toggle.
 * - A link click closes the menu and lets the anchor navigation take focus.
 * - Page scroll is locked while open; the menu closes when crossing into `md`.
 */
export function MobileNav({ items, resumePath }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Focus the first link on open, lock page scroll, close on Escape.
  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Close if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Keep Tab / Shift+Tab inside the toggle + menu links while open.
  const onKeyDownTrap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!open || event.key !== "Tab") return;
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
    const focusables = [toggleRef.current, ...links].filter((el): el is HTMLElement => el !== null);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="md:hidden" onKeyDown={onKeyDownTrap}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => (open ? close(true) : setOpen(true))}
        className={cn(
          "-mr-2 inline-flex size-11 items-center justify-center rounded-full text-fg",
          "transition-colors duration-(--duration-hover) hover:bg-surface-raised active:bg-surface",
        )}
      >
        {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>

      <div
        id={PANEL_ID}
        ref={panelRef}
        hidden={!open}
        className={cn(
          "fixed inset-x-0 top-(--spacing-header) bottom-0 z-50 overflow-y-auto border-t border-border bg-bg",
          "motion-safe:animate-menu-in",
        )}
      >
        <nav aria-label="Primary" className="px-4 pt-6 pb-10">
          <ul className="flex flex-col">
            {items.map((item, index) => (
              <li key={item.href} className="border-b border-border">
                <a
                  href={item.href}
                  onClick={() => close(false)}
                  className="flex min-h-14 items-center justify-between gap-4 py-2 text-h3 text-fg"
                >
                  {item.label}
                  <span aria-hidden="true" className="mono-label text-fg-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          {resumePath ? (
            <a
              href={resumePath}
              download
              type="application/pdf"
              onClick={() => close(false)}
              className={cn(
                "mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-(--button-ghost-border) px-5",
                "text-small font-medium text-fg",
              )}
            >
              <DownloadIcon className="size-4" />
              Resume
            </a>
          ) : null}
        </nav>
      </div>
    </div>
  );
}
