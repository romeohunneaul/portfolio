/**
 * What the MCP server exposes. Declared once, used by the route handler and
 * the /mcp page, so the documentation cannot drift from the server.
 */
export const mcpTools = [
  { name: "get_profile", description: "Bio, location, headline, languages and links." },
  { name: "get_experience", description: "Positions with dates, role, summary and highlights; education." },
  { name: "get_projects", description: "Problems worked on: context, problem, approach, stack, status." },
  { name: "get_project", description: "One project by slug.", args: "slug" },
  { name: "get_skills", description: "Skill groups and the tools actually used, with where." },
  { name: "get_trail", description: "Outdoor: trail and ski routes (GPX), plus races and UTMB index." },
  { name: "get_reading", description: "Articles that stuck, with a one-line why." },
  { name: "search", description: "Full-text search across all of the above.", args: "query" },
] as const;
