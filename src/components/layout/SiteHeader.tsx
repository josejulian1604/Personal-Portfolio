import Link from "next/link";
import { profile } from "@/content/profile";
import { nav, resumePath } from "@/content/site";
import { LinkButton } from "@/components/ui/LinkButton";
import { Monogram } from "@/components/ui/Monogram";
import { DownloadIcon } from "@/components/ui/icons";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { SectionNav } from "./SectionNav";

/**
 * Sticky, translucent site header, shared by every page (rendered in the root
 * layout). Nav links are root-relative ("/#about"), so they jump in place on the
 * home page and navigate home from case studies. Interactive parts are small
 * client islands.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40">
      {/* Blur lives on its own layer: backdrop-filter on <header> itself would
          become the containing block for the fixed mobile menu panel. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 border-b border-(--header-border) bg-(--header-bg) backdrop-blur-md"
      />
      <Container className="flex h-header items-center justify-between gap-6">
        <Link href="/" className="-ml-1 flex min-h-11 items-center gap-3 rounded-lg px-1">
          <Monogram initials={profile.initials} />
          <span className="hidden text-small font-medium text-fg lg:inline">{profile.name}</span>
          <span className="sr-only lg:hidden">{profile.name}</span>
        </Link>

        <div className="flex items-center gap-2">
          <SectionNav items={nav} />
          {resumePath ? (
            <LinkButton
              href={resumePath}
              variant="ghost"
              download
              type="application/pdf"
              className="hidden md:inline-flex"
            >
              <DownloadIcon className="size-4" />
              Resume
            </LinkButton>
          ) : null}
          <MobileNav items={nav} resumePath={resumePath} />
        </div>
      </Container>
    </header>
  );
}
