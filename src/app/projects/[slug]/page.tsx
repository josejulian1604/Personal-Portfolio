import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Container } from "@/components/layout/Container";
import { ProjectCover } from "@/components/home/ProjectCover";
import { CaseStudyHeader } from "@/components/project/CaseStudyHeader";
import { CaseStudyMeta } from "@/components/project/CaseStudyMeta";
import { CaseStudySection } from "@/components/project/CaseStudySection";
import { ProjectPager } from "@/components/project/ProjectPager";
import { getProject, projectHref } from "@/lib/projects";
import { socialMetadata } from "@/lib/seo";

/** Every case study is generated at build time; any other slug is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.tagline,
    ...socialMetadata({
      title: project.title,
      description: project.tagline,
      path: projectHref(project.slug),
      type: "article",
    }),
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="pt-8 pb-section md:pt-12">
      <Container>
        <CaseStudyHeader project={project} />

        <div className="mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-border md:mt-16 md:aspect-[2/1]">
          <ProjectCover project={project} sizes="(min-width: 75rem) 1136px, 100vw" preload />
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <CaseStudyMeta project={project} className="lg:col-span-4" />
          <div className="grid content-start gap-12 lg:col-span-7 lg:col-start-6">
            {project.sections.map((section, index) => (
              <CaseStudySection
                key={section.heading}
                section={section}
                index={index + 1}
                id={`${project.slug}-section-${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <ProjectPager slug={project.slug} />
        </div>
      </Container>
    </article>
  );
}
