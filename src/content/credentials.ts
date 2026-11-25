import type { Certification, EducationEntry, RecognitionEntry } from "./types";

export const education: EducationEntry[] = [
  {
    institution: "Costa Rica Institute of Technology (ITCR)",
    credential: "Bachelor's Degree in Computer Engineering",
    period: "2021 – 2026",
    location: "Cartago, Costa Rica",
  },
  {
    institution: "Codecademy",
    credential: "Agentic AI Development Bootcamp (AGAI-03), certified",
    period: "2026",
  },
];

export const certifications: Certification[] = [
  { name: "Building with the Claude API", issuer: "Anthropic", date: "Oct 2026" },
  { name: "Claude Code", issuer: "Anthropic", date: "2026" },
  { name: "Introduction to Agent Skills", issuer: "Anthropic", date: "2026" },
  { name: "GenDD Learning Path", issuer: "HatchWorks AI", date: "Oct 2026" },
];

export const recognition: RecognitionEntry[] = [
  {
    title: "Finalist, Reto Marte",
    event: "Fidelitas hackathon, Innovation & Sustainability Challenge",
    date: "June 2025",
    description: "Led a team of 5 to the top 7 teams.",
  },
];
