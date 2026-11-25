import type { CSSProperties } from "react";
import { profile } from "@/content/profile";
import { Container } from "@/components/layout/Container";
import { LoopMotif } from "@/components/motion/LoopMotif";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import { Grain } from "@/components/ui/Grain";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon } from "@/components/ui/icons";

/** Staggered CSS entrance (60ms steps). Disabled under reduced motion via `motion-safe:`. */
const enter = (step: number): CSSProperties => ({ animationDelay: `${step * 60}ms` });
const enterClass = "motion-safe:animate-rise";

/*
 * Hierarchy: the name is the <h1> at display size; the hero line is a large lead.
 * The name is the entity recruiters scan for and the page/SEO subject, and it
 * stays 2–3 lines at display size. The 19-word hero line would run 6+ lines at
 * display size and push the CTAs below the fold on mobile, so it reads better
 * as one lead paragraph directly under the name.
 *
 * The text uses a server-rendered CSS entrance (not <Reveal>) so the LCP text
 * paints immediately instead of waiting for hydration.
 */
export function Hero() {
  const { name, headline, hero, location, currentRole } = profile;

  return (
    <section aria-labelledby="hero-heading" className="relative isolate overflow-hidden">
      <Grain id="hero-grain" />

      <Container className="grid min-h-[calc(100svh-var(--spacing-header))] content-center gap-12 py-16 md:py-24 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-7">
          <p className={`mono-label text-accent ${enterClass}`} style={enter(0)}>
            {headline}
          </p>

          <h1 id="hero-heading" className={`mt-5 text-display text-fg ${enterClass}`} style={enter(1)}>
            {name}
          </h1>

          <p className={`mt-6 max-w-[36ch] text-lead text-fg-muted ${enterClass}`} style={enter(2)}>
            {hero}
          </p>

          <div className={`mt-10 flex flex-wrap items-center gap-3 ${enterClass}`} style={enter(3)}>
            <LinkButton href="#projects">
              View projects
              <ArrowRightIcon className="size-4" />
            </LinkButton>
            <LinkButton href="#contact" variant="ghost">
              Contact
            </LinkButton>
          </div>

          {/* Stacked on small screens, inline from `sm`, so the separator never dangles at a line end. */}
          <p
            className={`mt-10 flex flex-col gap-1 mono-label text-fg-muted sm:flex-row sm:items-center sm:gap-3 ${enterClass}`}
            style={enter(4)}
          >
            <span>{location}</span>
            <span aria-hidden="true" className="hidden text-fg-subtle sm:inline">
              ·
            </span>
            <span>
              {currentRole.title} at {currentRole.company}
            </span>
          </p>
        </div>

        <div className="relative lg:col-span-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[150%] -translate-1/2 hero-glow"
          />
          <Reveal delay={0.3} className="mx-auto max-w-md lg:max-w-none">
            {/* motion is only loaded for the loop; MotionConfig honors the OS reduce-motion setting. */}
            <MotionProvider>
              <LoopMotif />
            </MotionProvider>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
