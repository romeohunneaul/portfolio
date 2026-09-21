/**
 * Delivery lab — the discovery-to-delivery pipeline, one entry per step.
 * Changing a status is a one-line edit; the page, the MCP server and search follow.
 * `skills` are the actual skill slugs (public repo below); `tools` are the products used.
 * Private repos and clients are described, never linked.
 */

export type LabStatus = "validated" | "wip" | "thinking";

/** Where a skill lives, so the page can attribute and link it. */
export type SkillSource = "mine" | "matt-pocock";

/** No href = a skill that stays private (client material) and is only named. */
export type LabSkill = { name: string; source: SkillSource; href?: string };

export type LabStep = {
  slug: string;
  title: string;
  status: LabStatus;
  does: string;
  skills: LabSkill[];
  /** Products used at this step. */
  tools: string[];
  /** Artefact in → artefact out. */
  replay: string;
  links?: { label: string; url: string }[];
};

export type LabPhase = { title: string; steps: LabStep[] };

/** Distinct products across the pipeline, for the logo strip. `mark` keys into brandMarks. */
export const labStack: { name: string; url: string; mark?: string }[] = [
  { name: "Granola", url: "https://granola.ai" },
  { name: "Obsidian", url: "https://obsidian.md", mark: "obsidian" },
  { name: "Claude Code", url: "https://claude.com/claude-code", mark: "claude" },
  { name: "GitHub", url: "https://github.com", mark: "github" },
  { name: "Playwright", url: "https://playwright.dev", mark: "playwright" },
  { name: "GitBook", url: "https://gitbook.com", mark: "gitbook" },
  { name: "Vercel", url: "https://vercel.com", mark: "vercel" },
];

const REPO = { label: "This site's repo", url: "https://github.com/romeohunneaul/portfolio" };
const MP = { label: "mattpocock/skills", url: "https://github.com/mattpocock/skills" };

/** mine → the skill's folder in this public repo; mp → Matt Pocock's repo. */
const SKILLS_TREE = `${REPO.url}/tree/main/.claude/skills`;
/** Published in this repo. The rest stay private (they name client work) and are only mentioned. */
const PUBLISHED = new Set(["create-brief", "plan", "create-product-doc", "publish-product-doc", "gitbook-authoring"]);
const skills = {
  mine: (name: string): LabSkill => ({
    name,
    source: "mine",
    ...(PUBLISHED.has(name) ? { href: `${SKILLS_TREE}/${name}` } : {}),
  }),
  mp: (name: string): LabSkill => ({ name, source: "matt-pocock", href: MP.url }),
};

export const deliveryLab: LabPhase[] = [
  {
    title: "Discovery",
    steps: [
      {
        slug: "capture",
        title: "Capture",
        status: "validated",
        does: "Meetings and raw ideas land in one inbox, then get routed to the right project after I approve the plan. No silent move.",
        skills: [skills.mine("dispatch-inbox")],
        tools: ["Granola", "Obsidian", "Claude Code"],
        replay: "Call recording → dated Markdown note in git",
      },
      {
        slug: "synthesize",
        title: "Synthesize",
        status: "validated",
        does: "Turns a transcript into a structured note: decisions and actions for a meeting, jobs and frictions for user research, scenario by scenario for a prototype test.",
        skills: [
          skills.mine("synthesize-meeting"),
          skills.mine("synthesize-user-research"),
          skills.mine("synthesize-user-test"),
        ],
        tools: ["Claude Code"],
        replay: "Transcript → synthesis note",
      },
      {
        slug: "grill",
        title: "Grill",
        status: "validated",
        does: "An interview that stress-tests the idea, one decision per question, before anything gets written. The agent finds the facts, I make the calls.",
        skills: [skills.mp("grilling")],
        tools: ["Claude Code"],
        replay: "Rough idea → list of settled decisions",
      },
    ],
  },
  {
    title: "Alignment",
    steps: [
      {
        slug: "prd",
        title: "PRD",
        status: "validated",
        does: "The alignment document: the what and the why, shared by tech, design and business. The only artefact meant to outlive the feature.",
        skills: [skills.mine("create-brief")],
        tools: ["Claude Code"],
        replay: "Synthesis + decisions → brief",
      },
      {
        slug: "prototype",
        title: "Prototype",
        status: "wip",
        does: "Something clickable to align on before the spec hardens. It has its own lab.",
        skills: [skills.mp("prototype")],
        tools: ["Claude Code"],
        replay: "Brief → clickable prototype",
      },
      {
        slug: "gherkin-spec",
        title: "Gherkin spec",
        status: "wip",
        does: "The feature spec, with given / when / then scenarios. It is the contract automated QA reads later.",
        skills: [skills.mine("plan")],
        tools: ["Gherkin", "Claude Code"],
        replay: "Brief → scenarios",
      },
    ],
  },
  {
    title: "Delivery",
    steps: [
      {
        slug: "implement",
        title: "Implement",
        status: "validated",
        does: "Builds one vertical slice at a time with tests at the agreed seams, then reviews the diff on two axes: does it do what the plan asked, and does it respect the repo's own architecture rules.",
        skills: [
          skills.mine("setup-worktree"),
          skills.mp("implement"),
          skills.mp("tdd"),
          skills.mp("code-review"),
          skills.mine("deploy-preview-pipeline"),
        ],
        tools: ["Claude Code", "Vercel"],
        replay: "Scenarios → PR with a preview deploy",
      },
      {
        slug: "automated-qa",
        title: "Automated QA",
        status: "wip",
        does: "Reads the Gherkin scenarios and runs them: classic end-to-end tests, Playwright MCP, and briefs that Claude executes in the browser extension.",
        skills: [],
        tools: ["Playwright", "Playwright MCP", "Claude in Chrome"],
        replay: "Scenarios → test run",
        links: [REPO],
      },
      {
        slug: "manual-qa",
        title: "Manual QA",
        status: "wip",
        does: "I browse the preview and share what I see; the issues write themselves, triaged with labels.",
        skills: [],
        tools: ["Claude in Chrome", "GitHub Issues"],
        replay: "Screen capture → GitHub issue",
        links: [REPO],
      },
      {
        slug: "auto-fix",
        title: "Auto-fix",
        status: "thinking",
        does: "An agent picks up triaged issues and opens the fix as a pull request. Not tested yet.",
        skills: [],
        tools: ["GitHub", "Claude Code"],
        replay: "Issue → fix PR",
      },
    ],
  },
  {
    title: "Release",
    steps: [
      {
        slug: "documentation",
        title: "Documentation",
        status: "validated",
        does: "Turns a shipped feature into product documentation and publishes it to GitBook.",
        skills: [skills.mine("create-product-doc"), skills.mine("publish-product-doc"), skills.mine("gitbook-authoring")],
        tools: ["GitBook", "Claude Code"],
        replay: "Shipped feature → GitBook page",
      },
      {
        slug: "release-notes",
        title: "Release notes",
        status: "wip",
        does: "Writes the release note from the merged work, in the house format.",
        skills: [],
        tools: ["GitHub"],
        replay: "Merged PRs → release note",
      },
      {
        slug: "analytics",
        title: "Analytics",
        status: "thinking",
        does: "Close the loop: read what shipped features actually do in production, feed it back into discovery.",
        skills: [],
        tools: [],
        replay: "Production usage → next discovery",
      },
    ],
  },
];
