import type { Project } from "./types";

/**
 * Projects in the order they appear in docs/PORTFOLIO-CONTENT.md.
 * Section headings drop the content file's trailing period ("Problem." → "Problem");
 * all other copy is verbatim. Links marked `TODO` are omitted.
 */
export const projects: Project[] = [
  {
    slug: "breeders-desk",
    title: "Breeder's Desk",
    tagline:
      "AI assistant that helps plant breeders triage candidates — the agent explains, a deterministic engine decides, the breeder has the final word.",
    period: "Sep 2026",
    type: "Hackathon · Team project",
    context: "HatchWorks AI internal hackathon — R&D data unification via MCP",
    stack: [
      "Python",
      "FastAPI",
      "MCP",
      "Anthropic Claude API",
      "DuckDB",
      "Next.js",
      "TypeScript",
      "SQLite",
      "Docker",
      "Render",
    ],
    tags: ["Hackathon", "Team project", "MCP", "Anthropic Claude API", "Human-in-the-loop"],
    links: {},
    sections: [
      {
        heading: "Problem",
        body: "Plant breeders decide which candidates advance by manually reviewing data spread across several disconnected systems. It's slow, and it's hard to explain why a candidate passed or failed.",
      },
      {
        heading: "What we built",
        body: "A natural-language assistant over unified R&D data. Breeders ask questions in a chat, see a triage table with red/amber/green status per candidate, and can override any recommendation.",
      },
      {
        heading: "Architecture",
        bullets: [
          "Source data is unified into a single analytical store. Unstructured inputs become structured records through an LLM extractor plus human review.",
          "A deterministic scoring engine decides each candidate's status — the LLM never makes that call.",
          "An MCP server exposes the scoring engine and the data as tools.",
          "A FastAPI backend hosts a Claude agent with tool use and prompt caching, which answers through the MCP tools.",
          "An anti-hallucination validator checks agent answers against the data before they reach the user.",
          "Next.js frontend with chat, a triage table and human overrides.",
        ],
      },
      {
        heading: "Key decisions",
        bullets: [
          "The triage table bypasses the LLM entirely — faster and fully reliable for the core view.",
          "Overrides are stored separately, so human decisions stay auditable.",
          "The same MCP server plugs directly into Claude Desktop and Cursor.",
          "Human-in-the-loop is mandatory: the system recommends, the breeder decides.",
        ],
      },
      {
        heading: "My role",
        body: "Designed the system architecture as part of a team. Deployed as separate frontend, backend and data services.",
      },
      {
        heading: "What I learned",
        body: "Where an LLM adds value (explanation, natural-language access) and where deterministic code must own the decision.",
      },
    ],
  },
  {
    slug: "gendd-intake-agent",
    title: "GenDD Intake Agent — Event-Driven Pipeline",
    tagline:
      "Event-driven GCP infrastructure, built with Terraform, behind an internal AI agent product.",
    period: "Oct 2026",
    type: "Professional work",
    context: "HatchWorks AI — internal product",
    stack: [
      "Terraform",
      "GCP Pub/Sub",
      "Cloud Functions (Gen 2)",
      "Node.js",
      "TypeScript",
      "Next.js",
      "Cursor",
    ],
    tags: ["Professional work", "Terraform", "GCP", "Event-driven", "Infrastructure as code"],
    links: "private",
    sections: [
      {
        heading: "Context",
        body: "The GenDD Intake Agent is an internal Next.js/TypeScript app on GCP built around a conversational AI agent. When a conversation ends, its results flow into an asynchronous processing pipeline.",
      },
      {
        heading: "What I built",
        body: "The infrastructure for that pipeline, as code:",
        bullets: [
          "An event topic with authenticated push delivery to a serverless function.",
          "A Cloud Function (Gen 2) with unit tests as the pipeline's entry point.",
          "Failure handling with a retry policy and a dead-letter path, so failed messages are never retried forever.",
          "Least-privilege access: the function runs under its own identity, with no project-wide or public access.",
        ],
      },
      {
        heading: "How I worked",
        body: "Every phase started as an agent plan that I reviewed against the repository's standards before any code was written. Decisions were recorded in an implementation plan and an ADR. When a teammate's change landed on the shared dev environment mid-work, I verified there was no resource overlap before merging and re-planning.",
      },
      {
        heading: "Scope",
        body: "I work across the whole application, including its application and AI agent layers; this case study focuses on the event-driven infrastructure.",
      },
      {
        heading: "Also",
        body: "Evaluated the intake agent by running simulated conversations across different industries to surface gaps in its conversation flow.",
      },
    ],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    tagline: "This site, built agent-first with Claude Code — I plan and review, the agent implements.",
    period: "2026",
    type: "Personal project",
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Vercel",
      "Claude Code",
      "Claude Design",
    ],
    tags: ["Personal project", "Next.js", "Claude Code", "GenDD"],
    links: {},
    sections: [
      {
        heading: "Goal",
        body: "Build my portfolio while practicing Generative-Driven Development end to end.",
      },
      {
        heading: "Workflow",
        body: "I defined project structure, context files and coding standards with the agent first. Claude Code implemented features; I reviewed every change before committing, then requested corrections and QA, and iterated.",
      },
      {
        heading: "Decisions",
        body: "Content as typed data instead of a CMS; project cards linking to full case studies; contact through direct links; visual design explored in Claude Design.",
      },
      {
        heading: "What I learned",
        body: "The quality of an agent's output depends on the quality of the context and standards you give it.",
      },
    ],
  },
  {
    slug: "pulse",
    title: "Pulse",
    tagline:
      "Serverless news app where a scheduled pipeline uses Claude to curate and summarize the day's news.",
    period: "2026",
    type: "Personal project",
    stack: [
      "AWS Lambda",
      "EventBridge",
      "DynamoDB",
      "API Gateway",
      "Terraform",
      "Node.js",
      "TypeScript",
      "Anthropic Claude API",
      "Jest",
    ],
    tags: ["Personal project", "Serverless", "AWS", "Terraform", "Anthropic Claude API"],
    links: {},
    sections: [
      {
        heading: "What it does",
        body: "Collects news on a daily schedule, processes it with Claude, and serves curated summaries.",
      },
      {
        heading: "Architecture",
        body: "Clean separation between ingestion, AI processing and presentation; EventBridge triggers the daily run; Lambda, DynamoDB and API Gateway; full AWS infrastructure as code with Terraform and least-privilege IAM.",
      },
      {
        heading: "Key decision",
        body: "Two-layer caching (DynamoDB TTL + client-side) to cut model cost and latency.",
      },
      {
        heading: "Quality",
        body: "Jest unit and integration tests for Lambda handlers and caching logic.",
      },
    ],
  },
  {
    slug: "rag-japan-travel-chatbot",
    title: "RAG Japan Travel Chatbot",
    tagline: "Travel assistant grounded in a curated knowledge base, with hybrid retrieval and source citations.",
    period: "2026",
    type: "Bootcamp capstone",
    context: "Capstone of the Agentic AI Development Bootcamp (AGAI-03)",
    stack: [
      "Python",
      "LangChain",
      "ChromaDB",
      "all-MiniLM-L6-v2",
      "Playwright",
      "Streamlit",
      "Anthropic Claude API",
    ],
    tags: ["Bootcamp capstone", "RAG", "LangChain", "ChromaDB", "Python"],
    links: {},
    sections: [
      {
        heading: "Data pipeline",
        body: "A curated URL list (instead of automated crawling, due to inconsistent site URLs) scraped with Playwright, since pages render content with JavaScript; CSS-selector extraction to avoid navigation and popup noise.",
      },
      {
        heading: "Knowledge base",
        body: "Two ChromaDB collections — 338 Q&A pairs (primary) and 836 document chunks (fallback), embedded with all-MiniLM-L6-v2. Q&A pairs embed the questions, since user queries resemble questions more than answers. The number of pairs adapts to page length to avoid hallucinated pairs on short pages.",
      },
      {
        heading: "Retrieval",
        body: "Hybrid: search Q&A pairs first; below a 0.75 cosine-similarity threshold, fall back to document chunks.",
      },
      {
        heading: "Interface",
        body: "Streamlit UI with source citations.",
      },
    ],
  },
  {
    slug: "sigac",
    title: "SIGAC",
    tagline:
      "Scheduling and consulting-room management system for a public hospital, built from requirements gathered with its staff.",
    period: "2025",
    type: "Professional work",
    context: "Internship — Monseñor Sanabria Hospital",
    stack: ["React", "TypeScript", "Tailwind CSS", "MySQL"],
    tags: ["Professional work", "Internship", "React", "TypeScript", "MySQL"],
    links: "none",
    sections: [
      {
        heading: "Problem",
        body: "Coordinating schedules and consulting rooms across a public hospital's departments.",
      },
      {
        heading: "What I did",
        body: "Gathered requirements directly from hospital staff and translated real operational workflows into a working system.",
      },
      {
        heading: "Key decision",
        body: "Enforced complex scheduling rules and constraints at the data layer (MySQL schemas and stored procedures) to protect data integrity under concurrent multi-user access.",
      },
    ],
  },
];
