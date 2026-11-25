"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every <Reveal> on the page. Marks each
 * `[data-reveal]` element with `data-revealed` the first time it enters the
 * viewport, then stops watching it (reveal once, never on every scroll).
 * Re-runs after client-side navigation, when a new page brings new elements.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    if (pending.length === 0) return;

    const reveal = (element: Element) => element.setAttribute("data-revealed", "");
    if (!("IntersectionObserver" in window)) {
      pending.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    pending.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
