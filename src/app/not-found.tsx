import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Grain } from "@/components/ui/Grain";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowRightIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Styled 404, rendered inside the root layout (header, footer, skip link). */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-heading" className="relative isolate overflow-hidden">
      <Grain id="not-found-grain" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 aspect-square w-[min(56rem,140vw)] -translate-x-1/2 -translate-y-1/3 hero-glow"
      />
      <Container className="flex min-h-[calc(100svh-var(--spacing-header))] flex-col justify-center py-24">
        <p className="mono-label text-accent">Error 404</p>
        <h1 id="not-found-heading" className="mt-5 max-w-[16ch] text-title text-fg">
          Page not found
        </h1>
        <p className="mt-6 max-w-[44ch] text-lead text-fg-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/">
            Back to home
            <ArrowRightIcon className="size-4" />
          </LinkButton>
          <LinkButton href="/#projects" variant="ghost">
            View projects
          </LinkButton>
        </div>
      </Container>
    </section>
  );
}
