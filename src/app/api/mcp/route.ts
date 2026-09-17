import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { education, experience, profile, skills, stack } from "@/data/profile";
import { projects } from "@/data/projects";
import { articles } from "@/data/reading";
import { races, routes, utmb } from "@/data/trail";

const json = (data: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }] });

const corpus = () => [
  { kind: "profile", text: [profile.name, profile.headline, ...profile.bio, ...profile.now].join(" "), data: profile },
  ...experience.map((x) => ({ kind: "experience", text: [x.company, x.role, x.summary, ...(x.bullets ?? [])].join(" "), data: x })),
  ...projects.map((p) => ({ kind: "project", text: [p.title, p.context, p.problem, ...p.approach, ...p.stack].join(" "), data: p })),
  ...stack.map((t) => ({ kind: "tool", text: `${t.name} ${t.used}`, data: t })),
  ...articles.map((a) => ({ kind: "article", text: `${a.title} ${a.author} ${a.why}`, data: a })),
  ...races.map((r) => ({ kind: "race", text: r.name, data: r })),
  ...routes.map((r) => ({ kind: "route", text: `${r.name} ${r.where} ${r.note}`, data: r })),
];

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "get_profile",
      { title: "Profile", description: "Bio, location, headline, languages and links.", inputSchema: z.object({}) },
      async () => json(profile),
    );
    server.registerTool(
      "get_experience",
      { title: "Experience", description: "Positions with dates, role, summary and highlights; education.", inputSchema: z.object({}) },
      async () => json({ experience, education }),
    );
    server.registerTool(
      "get_projects",
      { title: "Projects", description: "Problems worked on: context, problem, approach, stack, status.", inputSchema: z.object({}) },
      async () => json(projects),
    );
    server.registerTool(
      "get_project",
      {
        title: "One project",
        description: `One project by slug. Slugs: ${projects.map((p) => p.slug).join(", ")}.`,
        inputSchema: z.object({ slug: z.string() }),
      },
      async ({ slug }) => {
        const p = projects.find((x) => x.slug === slug);
        return p ? json(p) : { content: [{ type: "text", text: `No project "${slug}".` }], isError: true };
      },
    );
    server.registerTool(
      "get_skills",
      { title: "Skills & tools", description: "Skill groups and the tools actually used, with where.", inputSchema: z.object({}) },
      async () => json({ skills, stack }),
    );
    server.registerTool(
      "get_trail",
      { title: "Trail", description: "UTMB index, races, and the GPX routes on the site.", inputSchema: z.object({}) },
      async () => json({ utmb, races, routes: routes.map((r) => ({ ...r, gpx: `${profile.links.site}/gpx/${r.slug}.gpx` })) }),
    );
    server.registerTool(
      "get_reading",
      { title: "Reading", description: "Articles that stuck, with a one-line why.", inputSchema: z.object({}) },
      async () => json(articles),
    );
    server.registerTool(
      "search",
      {
        title: "Search",
        description: "Full-text search across profile, experience, projects, tools, articles, races and routes.",
        inputSchema: z.object({ query: z.string().min(2) }),
      },
      async ({ query }) => {
        const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
        const hits = corpus()
          .map((c) => ({ ...c, score: terms.filter((t) => c.text.toLowerCase().includes(t)).length }))
          .filter((c) => c.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .map(({ kind, data }) => ({ kind, data }));
        return json(hits);
      },
    );
  },
  {
    serverInfo: { name: "francois-massanes", version: "1.0.0" },
    instructions: `Read-only profile of ${profile.name}, product manager (AI in business software), Lyon. Use get_profile first, then the specific tool. Nothing here writes anything.`,
  },
);

export { handler as GET, handler as POST };
