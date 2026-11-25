import Link from "next/link";
import { cn } from "@/lib/cn";
import { getProjectNeighbors, projectHref } from "@/lib/projects";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/ui/icons";

const cardClasses = cn(
  "group flex min-h-11 flex-col gap-3 rounded-2xl border border-(--card-border) bg-(--card-bg) p-6",
  "transition-[border-color,translate] duration-(--duration-hover) ease-out-quint",
  "hover:-translate-y-0.5 hover:border-(--card-border-hover) hover:duration-(--duration-ui)",
  "active:translate-y-0 motion-reduce:hover:translate-y-0",
);

/** Previous / next case study, wrapping around the project list. */
export function ProjectPager({ slug }: { slug: string }) {
  const neighbors = getProjectNeighbors(slug);
  if (!neighbors) return null;
  const { previous, next } = neighbors;

  return (
    <nav aria-label="More case studies" className="border-t border-border pt-12 md:pt-16">
      <ul className="grid gap-4 md:grid-cols-2 md:gap-6">
        <li>
          <Link href={projectHref(previous.slug)} rel="prev" className={cardClasses}>
            <span className="flex items-center gap-2 mono-label text-fg-subtle">
              <ArrowLeftIcon className="size-4 transition-transform duration-(--duration-hover) group-hover:-translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
              Previous
            </span>
            <span className="text-h3 text-fg">{previous.title}</span>
          </Link>
        </li>
        <li>
          <Link href={projectHref(next.slug)} rel="next" className={cn(cardClasses, "md:items-end md:text-right")}>
            <span className="flex items-center gap-2 mono-label text-fg-subtle">
              Next
              <ArrowRightIcon className="size-4 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" />
            </span>
            <span className="text-h3 text-fg">{next.title}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
