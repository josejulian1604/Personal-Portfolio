"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface SpotlightGroupProps {
  children: ReactNode;
  className?: string;
}

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/**
 * Cursor spotlight for a group of cards, via one delegated pointermove
 * listener. It writes --spot-x / --spot-y on the hovered `[data-spotlight]`
 * element; the card paints the glow with the `card-spotlight` utility.
 *
 * Only attaches for fine pointers that can hover (mouse, trackpad). The glow
 * itself is hidden under reduced motion in CSS. Writes CSS variables directly
 * (no React state), so moving the cursor never re-renders anything.
 */
export function SpotlightGroup({ children, className }: SpotlightGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia(FINE_POINTER).matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!card || !root.contains(card)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
      });
    };

    root.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      root.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
