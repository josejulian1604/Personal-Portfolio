"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimate, useInView, useReducedMotion, type AnimationPlaybackControls } from "motion/react";
import { cn } from "@/lib/cn";
import { DURATION, EASE_OUT_QUINT } from "@/lib/motion";

/*
 * Signature hero motif: an infinity-shaped loop passing through two nodes,
 * "agent" and "human". The violet loop draws once (pathLength), then a short
 * pulse travels it slowly (pathOffset). Decorative only (aria-hidden).
 *
 * - Reduced motion: fully static (loop drawn, no pulse).
 * - Off-screen: the pulse is paused.
 * - Only pathLength / pathOffset / opacity animate; the SVG has intrinsic
 *   width/height so it reserves its box and never shifts layout.
 */

const VIEW_W = 600;
const VIEW_H = 280;
const CY = VIEW_H / 2;
const AGENT_X = 120;
const HUMAN_X = 480;

// Lemniscate through both nodes, crossing at the center (300, 140).
const LOOP_PATH =
  "M300 140C355 52 480 52 480 140C480 228 355 228 300 140" +
  "C245 52 120 52 120 140C120 228 245 228 300 140Z";

/** Pulse length as a fraction of the loop. Spacing = 1 - length keeps the lap seamless. */
const PULSE_LENGTH = 0.06;

const pulseInitial = {
  pathLength: PULSE_LENGTH,
  pathSpacing: 1 - PULSE_LENGTH,
  pathOffset: 0,
  opacity: 0,
};

interface NodeProps {
  x: number;
  label: string;
  side: "left" | "right";
  dotClassName: string;
}

function LoopNode({ x, label, side, dotClassName }: NodeProps) {
  const labelOffset = 32;
  return (
    <g>
      <circle cx={x} cy={CY} r={18} strokeWidth={1.5} className="fill-bg stroke-border-strong" />
      <circle cx={x} cy={CY} r={5} className={dotClassName} />
      <text
        x={side === "left" ? x - labelOffset : x + labelOffset}
        y={CY}
        dominantBaseline="central"
        textAnchor={side === "left" ? "end" : "start"}
        fontSize={20}
        letterSpacing="0.06em"
        className="fill-fg-muted font-mono"
      >
        {label}
      </text>
    </g>
  );
}

export function LoopMotif({ className }: { className?: string }) {
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const inView = useInView(scope, { amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const pulse = useRef<AnimationPlaybackControls | null>(null);
  const hasStarted = useRef(false);
  /** Bumped whenever motion is disabled, so stale draw callbacks bail out. */
  const runId = useRef(0);
  const inViewRef = useRef(inView);

  useEffect(() => {
    inViewRef.current = inView;
  }, [inView]);

  useEffect(() => {
    if (reduceMotion) {
      runId.current += 1;
      hasStarted.current = false;
      pulse.current?.stop();
      pulse.current = null;
      animate("[data-loop-draw]", { pathLength: 1 }, { duration: 0 });
      animate("[data-loop-pulse]", { opacity: 0 }, { duration: 0 });
      return;
    }

    if (!inView) {
      pulse.current?.pause();
      return;
    }

    if (hasStarted.current) {
      pulse.current?.play();
      return;
    }

    hasStarted.current = true;
    const id = runId.current;
    animate("[data-loop-draw]", { pathLength: [0, 1] }, { duration: DURATION.draw, ease: EASE_OUT_QUINT }).then(
      () => {
        if (id !== runId.current || !scope.current) return;
        animate("[data-loop-pulse]", { opacity: 1 }, { duration: DURATION.reveal });
        pulse.current = animate(
          "[data-loop-pulse]",
          { pathOffset: [0, 1] },
          { duration: DURATION.pulseLap, ease: "linear", repeat: Infinity },
        );
        if (!inViewRef.current) pulse.current.pause();
      },
    );
  }, [inView, reduceMotion, animate, scope]);

  return (
    <svg
      ref={scope}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width={VIEW_W}
      height={VIEW_H}
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
    >
      {/* Static track: keeps the motif legible before hydration. */}
      <path d={LOOP_PATH} strokeWidth={1.5} className="fill-none stroke-border-strong" />

      {/* Violet loop, drawn once. */}
      <motion.path
        data-loop-draw=""
        d={LOOP_PATH}
        strokeWidth={2}
        className="fill-none stroke-accent"
        initial={{ pathLength: 0 }}
      />

      {/* Pulse: soft halo + bright core, traveling the loop together. */}
      <motion.path
        data-loop-pulse=""
        d={LOOP_PATH}
        strokeWidth={9}
        strokeLinecap="round"
        className="fill-none stroke-accent/20"
        initial={pulseInitial}
      />
      <motion.path
        data-loop-pulse=""
        d={LOOP_PATH}
        strokeWidth={3}
        strokeLinecap="round"
        className="fill-none stroke-accent-hover"
        initial={pulseInitial}
      />

      <LoopNode x={AGENT_X} label="agent" side="left" dotClassName="fill-accent" />
      <LoopNode x={HUMAN_X} label="human" side="right" dotClassName="fill-fg" />
    </svg>
  );
}
