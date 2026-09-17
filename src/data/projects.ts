/**
 * Work, told by the problem. Clients stay backstage: named when public, never
 * showcased. No numbers that belong to someone else.
 */

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  context: string;
  problem: string;
  approach: string[];
  stack: string[];
  links?: { label: string; url: string }[];
  status: "shipped" | "in progress" | "prototype" | "open source";
};

export const projects: Project[] = [
  {
    slug: "odyssee",
    title: "A catalogue you can talk to",
    year: "2025–2026",
    role: "Product, design, build",
    context: "Tooling for independent bookshops, built with a publisher-side co-founder.",
    problem:
      "Publisher feeds are poor: most new titles arrive without a cover, and the useful editorial signal lives in 100-page PDFs nobody can filter. Booksellers pick blind.",
    approach: [
      "Aggregate the industry feeds (ONIX / Dilicom) into one browsable grid, then enrich it.",
      "AI tagging across several taxonomies, every run traced so a wrong tag can be explained.",
      "Extract the editor's own pitch from catalogue PDFs with a dedicated skill.",
      "Next: an agent that turns a sentence into filters on the grid — it proposes, the interface stays in charge.",
    ],
    stack: ["Next.js", "Vercel AI SDK", "OpenRouter", "LangSmith", "Supabase", "n8n", "Playwright"],
    status: "in progress",
  },
  {
    slug: "cryospace",
    title: "Samples, tanks and the cold chain",
    year: "2026",
    role: "Product, data model, build",
    context: "A SaaS for cryogenic biobanks, for an AI studio's life-science client.",
    problem:
      "Three systems that never talk: the LIMS, the tank temperature monitoring, and paper in a −150 °C room. Who did what, when, on which sample — provable for decades.",
    approach: [
      "One model for tanks, containers, samples and their parent/child derivations.",
      "An equipment anomaly cascades to every sample it touched — the first need on every site.",
      "Audit trail designed for the regulation, not bolted on after.",
      "Hexagonal API, previews per branch, a UI kit with stories.",
    ],
    stack: ["NestJS", "Prisma", "PostgreSQL", "React", "TanStack", "Zustand", "Tailwind", "Storybook", "Cloud Run"],
    status: "shipped",
  },
  {
    slug: "mineral-expertise",
    title: "A price list that writes itself",
    year: "2026",
    role: "Discovery, architecture, skills",
    context: "A one-person construction project management firm.",
    problem:
      "Three hours to prepare each supplier consultation, a supplier pool that lives in one head, and a price reference that every previous tool failed to keep alive.",
    approach: [
      "No new app. Claude Code, a Dropbox MCP and three skills, installed as a plugin.",
      "The price reference is a side effect of the work, never a task of its own.",
      "Accepted limits written down: no binaries written, files under 5 MB.",
    ],
    stack: ["Claude Code", "MCP", "Skills / plugins"],
    status: "prototype",
  },
  {
    slug: "agicap",
    title: "A product team industrialising its agents",
    year: "2026",
    role: "Product manager, freelance",
    context: "Treasury software, procure-to-pay then accounts receivable squads.",
    problem:
      "Cover a product manager's absence without slowing two squads — and look at how a team shares one agentic toolbox.",
    approach: [
      "Shipped on the existing roadmap from week one.",
      "Observed a shared Claude Code meta-repo — contexts, skills, agents — resynced every morning.",
      "Material for a note on agentic workflows at team scale.",
    ],
    stack: ["Claude Code", "Notion"],
    status: "in progress",
  },
  {
    slug: "claude-garmin",
    title: "Garmin, read by an agent",
    year: "2026",
    role: "Author",
    context: "Side project, MIT.",
    problem:
      "Training data sits in an app that answers no questions. Twenty tools expose recovery, load, running dynamics and plans to Claude Desktop.",
    approach: ["Python MCP server over the Garmin Connect API.", "Feeds the trail section of this site."],
    stack: ["Python", "MCP"],
    links: [{ label: "github", url: "https://github.com/Jack-Abyss/claude-garmin" }],
    status: "open source",
  },
  {
    slug: "this-site",
    title: "This notebook",
    year: "2026",
    role: "Everything",
    context: "A site that is also the lab for an AI-assisted dev workflow.",
    problem: "Show the work without a skills section — and let an agent read the profile as easily as a person.",
    approach: [
      "Data files feed the pages and an MCP server at /api/mcp.",
      "GPX traces drawn as SVG at build time.",
      "Storybook for every component, Playwright on desktop and mobile.",
    ],
    stack: ["Next.js", "Tailwind", "GSAP", "MDX", "mcp-handler", "Storybook", "Vitest", "Playwright"],
    links: [{ label: "github", url: "https://github.com/romeohunneaul/portfolio" }],
    status: "in progress",
  },
];
