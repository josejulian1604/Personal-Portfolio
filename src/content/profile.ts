import type { Profile } from "./types";

export const profile: Profile = {
  name: "José Julián Gutiérrez Badilla",
  initials: "JG",
  headline: "Software Engineer · Agentic Development",
  location: "Costa Rica",
  currentRole: {
    title: "Software Engineering Intern",
    company: "HatchWorks AI",
    period: "Aug 2026 – Present",
  },
  focus: [
    "Agentic development",
    "GenDD (Generative-Driven Development)",
    "human-in-the-loop",
    "full-stack",
    "AI",
  ],
  languages: [
    { language: "Spanish", level: "native" },
    { language: "English", level: "C1" },
  ],
  hero: "Software engineer building AI agents that people can trust — agents do the work, humans stay in the loop.",
  about:
    "I'm a Software Engineering graduate from ITCR (Costa Rica Institute of Technology) working on agentic development at HatchWorks AI. My day-to-day follows a Generative-Driven Development workflow: I plan context, standards and architecture with AI agents, delegate implementation, and review every change before it ships. I've designed Claude-based agents with tool use, MCP servers and deterministic guardrails, and delivered them end to end across TypeScript/Next.js, Python/FastAPI and cloud infrastructure (GCP, AWS, Terraform). I learn new technologies by building real projects with them, and I care about shipping work I'd be proud to show.",
  contact: {
    email: "joseguba1604@gmail.com",
    linkedin: "https://www.linkedin.com/in/jose-julian-gutierrez-badilla-8095a528a",
    github: "https://github.com/josejulian1604",
  },
  photo: {
    src: "/images/profile.jpg",
    alt: "Portrait of José Julián Gutiérrez Badilla",
    width: 1000,
    height: 1500,
  },
};
