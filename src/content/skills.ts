import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  {
    group: "Agentic AI",
    items: [
      "Claude API (tool use, prompt caching)",
      "MCP servers",
      "subagent orchestration",
      "Agent Skills",
      "RAG",
      "LangChain",
      "context engineering",
      "human-in-the-loop design",
    ],
  },
  {
    group: "AI dev tools",
    items: ["Claude Code", "Cursor", "Claude Design"],
  },
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    group: "Backend & APIs",
    items: ["FastAPI", "Node.js", "Express", "REST APIs"],
  },
  {
    group: "Frontend",
    items: ["Next.js", "React", "Tailwind CSS"],
  },
  {
    group: "Cloud & IaC",
    items: [
      "GCP (Pub/Sub, Cloud Functions)",
      "AWS (Lambda, DynamoDB, API Gateway, EventBridge)",
      "Terraform",
      "Docker",
      "Git",
    ],
  },
  {
    group: "Data",
    items: ["DuckDB", "PostgreSQL", "MySQL", "MongoDB", "ChromaDB"],
  },
  {
    group: "Practices",
    items: ["GenDD", "ADRs", "plan-then-implement reviews", "Agile/Scrum"],
  },
];
