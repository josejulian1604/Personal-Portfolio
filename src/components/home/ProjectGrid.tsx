import { projects } from "@/content/projects";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SpotlightGroup } from "@/components/motion/SpotlightGroup";
import { ProjectCard } from "./ProjectCard";

/** Projects: 1 / 2 / 3 columns. Cards reveal row by row with a short stagger. */
export function ProjectGrid() {
  return (
    <Section id="projects" index={3} label="Projects" heading="Selected projects">
      <SpotlightGroup>
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal index={index % 3} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </SpotlightGroup>
    </Section>
  );
}
