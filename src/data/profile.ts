/**
 * Single source of truth for who François is. Read by the pages and by the
 * MCP server (`/api/mcp`), so an edit here changes both.
 */

export const profile = {
  name: "François Massanes",
  location: "Lyon, France",
  headline: "Product manager, AI in business software.",
  bio: [
    "Product manager, AI in business software. My job is wiring a model into tools people already depend on without breaking the people.",
    "SaaS, B2B2C, and a fair amount of AI — when it actually solves something. Ten years next to engineering teams, the last two building alone with an agent at my side.",
    "The rest of the time I run up hills, slowly. Both go in the notebook.",
  ],
  now: [
    "Freelance product work on AI-heavy B2B software",
    "Rebuilding this site in public, writing shorter",
    "Training for the next 50K",
  ],
  email: "francois.massanes@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/francois-massanes/",
    github: "https://github.com/romeohunneaul",
    strava: "https://www.strava.com/athletes/83347344",
    utmb: "https://utmb.world/fr/runner/5043490.francois.massanes",
    site: "https://francoismassanes.com",
    /** "https://wa.me/<number, international, digits only>" — empty hides the WhatsApp link. */
    whatsapp: "" as string,
  },
  languages: ["French (native)", "English (full professional)", "German (professional)"],
} as const;

export type Experience = {
  company: string;
  role: string;
  start: string; // YYYY or YYYY-MM
  end: string | "now";
  location?: string;
  logo?: string; // /logos/<file>.png, monochrome-filtered on the page
  url?: string;
  summary: string;
  bullets?: string[];
  kind: "job" | "freelance";
};

export const experience: Experience[] = [
  {
    company: "Independent",
    role: "Product builder — AI in business software",
    start: "2025",
    end: "now",
    location: "Lyon",
    kind: "freelance",
    summary:
      "End to end on small teams or alone: user research, design, build, launch. Missions in biobanking, publishing, treasury software and construction.",
    bullets: [
      "Cryospace — a SaaS for cryogenic sample management, where a data-model mistake has physical consequences (NestJS, Prisma, React, GCP).",
      "Odyssée — bookshop catalogue tooling with AI tagging and natural-language search over publisher feeds (Next.js, Vercel AI SDK, Supabase, LangSmith).",
      "Agicap — product management reinforcement on treasury squads, with an outside eye on the team's agentic tooling.",
      "Mineral Expertise — a Claude Code assistant for a project manager: supplier consultations and a price reference that builds itself as a side effect.",
    ],
  },
  {
    company: "Taster",
    role: "VP Product",
    start: "2021",
    end: "2024",
    location: "Paris",
    logo: "/logos/taster.png",
    url: "https://taster.com",
    kind: "job",
    summary:
      "First product hire, then built the product team. Supply chain and logistics for 150+ delivery-only restaurants across five countries.",
    bullets: [
      "Owned the operations platform: ordering, kitchen flow, supply, quality.",
      "Moved the team from Scrum to Shape Up; measured the impact of every release.",
      "Kept going into kitchens every month until I left.",
    ],
  },
  {
    company: "Leah Care",
    role: "Head of Product",
    start: "2018",
    end: "2021",
    location: "Paris",
    kind: "job",
    summary:
      "First product profile on a telemedicine platform. Structured the discovery and delivery practice, grew the team.",
  },
  {
    company: "Artefact",
    role: "Product Manager",
    start: "2016",
    end: "2018",
    location: "Paris · Dubai",
    logo: "/logos/artefact.png",
    url: "https://www.artefact.com",
    kind: "job",
    summary:
      "Data and AI consulting for luxury, retail and media groups. Learned to measure impact before shipping anything.",
  },
];

export const education = [
  {
    school: "emlyon business school",
    degree: "Master — entrepreneurship, corporate finance",
    start: "2012",
    end: "2015",
  },
];

export type SkillGroup = { name: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    name: "Product",
    items: [
      "Discovery & user research",
      "Jobs to be done",
      "Shape Up",
      "Roadmapping",
      "Impact measurement",
      "Team building",
      "B2B SaaS",
      "B2B2C",
    ],
  },
  {
    name: "AI in products",
    items: [
      "LLM integration in business UIs",
      "Tool calling & MCP",
      "Prompt & eval loops",
      "Tagging / classification pipelines",
      "Agentic dev workflow (Claude Code)",
    ],
  },
  {
    name: "Build",
    items: [
      "TypeScript",
      "React / Next.js",
      "Node (NestJS)",
      "PostgreSQL / Prisma / Supabase",
      "Data modelling",
      "Testing (Vitest, Playwright)",
    ],
  },
];

export type Tech = { name: string; url: string; used: string; group: "AI" | "Web" | "Data" | "Ops" };

/** Only tools actually used in shipped work. */
export const stack: Tech[] = [
  { name: "Vercel AI SDK", url: "https://ai-sdk.dev", used: "Odyssée — streaming chat, tool calls, generative UI", group: "AI" },
  { name: "LangSmith", url: "https://smith.langchain.com", used: "Odyssée — tracing every tagging run", group: "AI" },
  { name: "OpenRouter", url: "https://openrouter.ai", used: "Odyssée — model routing", group: "AI" },
  { name: "Model Context Protocol", url: "https://modelcontextprotocol.io", used: "Garmin server, Dropbox tools, this site", group: "AI" },
  { name: "Claude Code", url: "https://claude.com/claude-code", used: "Daily driver — skills, plugins, CI agents", group: "AI" },
  { name: "n8n", url: "https://n8n.io", used: "Odyssée — publisher feed automations", group: "AI" },
  { name: "Next.js", url: "https://nextjs.org", used: "Odyssée, this site", group: "Web" },
  { name: "React", url: "https://react.dev", used: "Everywhere", group: "Web" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com", used: "Cryospace, Odyssée, this site", group: "Web" },
  { name: "shadcn/ui", url: "https://ui.shadcn.com", used: "Odyssée", group: "Web" },
  { name: "TanStack", url: "https://tanstack.com", used: "Cryospace — router, query", group: "Web" },
  { name: "Storybook", url: "https://storybook.js.org", used: "Cryospace UI kit, this site", group: "Web" },
  { name: "NestJS", url: "https://nestjs.com", used: "Cryospace — hexagonal API", group: "Data" },
  { name: "Prisma", url: "https://www.prisma.io", used: "Cryospace", group: "Data" },
  { name: "PostgreSQL", url: "https://www.postgresql.org", used: "Cryospace, Odyssée", group: "Data" },
  { name: "Supabase", url: "https://supabase.com", used: "Odyssée", group: "Data" },
  { name: "Zod", url: "https://zod.dev", used: "Every boundary", group: "Data" },
  { name: "Vercel", url: "https://vercel.com", used: "Odyssée, this site", group: "Ops" },
  { name: "Google Cloud Run", url: "https://cloud.google.com/run", used: "Cryospace — previews per branch", group: "Ops" },
  { name: "GitHub Actions", url: "https://github.com/features/actions", used: "CI + Claude review agent", group: "Ops" },
  { name: "Playwright", url: "https://playwright.dev", used: "Odyssée, this site", group: "Ops" },
];
