import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Credentials } from "@/components/home/Credentials";
import { Currently } from "@/components/home/Currently";
import { Experience } from "@/components/home/Experience";
import { Hero } from "@/components/home/Hero";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { Skills } from "@/components/home/Skills";
import { SITE_TITLE, socialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: SITE_TITLE },
  description: profile.hero,
  ...socialMetadata({ title: SITE_TITLE, description: profile.hero, path: "/" }),
};

/*
 * Narrative arc: hero → current role → about → proof (experience, projects)
 * → depth (skills, credentials) → contact. Sections alternate dense (surface
 * band) and airy (page ground) so each reads as one idea.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Currently />
      <About />
      <Experience />
      <ProjectGrid />
      <Skills />
      <Credentials />
      <Contact />
    </>
  );
}
