/**
 * Protolab note — the journey grid and the marked-up page of `content/notes/protolab.mdx`.
 * Integrated from the closed prototype (`portfolio-protos`, tag `protolab-showcase/v1`).
 * The prose lives in the MDX; this file holds what the two sections draw.
 */

/** A tool used before protolab. */
export type Attempt = { id: string; tool: string };

export const attempts: Attempt[] = [
  { id: "claude-design", tool: "Claude Design" },
  { id: "branch", tool: "Dev branch" },
  { id: "lovable", tool: "Lovable" },
  { id: "storybook", tool: "Storybook" },
  { id: "figma-make", tool: "Figma Make" },
];

export const lab: Attempt = { id: "protolab", tool: "protolab" };

/** Criteria of the grid. */
export const criteria = [
  { id: "ds", label: "Production design system" },
  { id: "data", label: "Data shaped like production" },
  { id: "scenarios", label: "Data scenarios" },
  { id: "compare", label: "Versions side by side" },
  { id: "light", label: "Light to iterate" },
  { id: "share", label: "A link to share" },
  { id: "setup", label: "Nothing to install" },
  { id: "explore", label: "Free visual exploration" },
] as const;

export type Fit = "yes" | "partly" | "no";

// Placeholder: these cells are inferred from François's account, not checked against each tool.
// The last two criteria are the ones protolab loses (a perfect column reads as rigged).
// To validate before publishing, especially Claude Design and Figma Make.
export const fit: Record<string, Record<(typeof criteria)[number]["id"], Fit>> = {
  "claude-design": { ds: "partly", data: "no", scenarios: "no", compare: "partly", light: "yes", share: "yes", setup: "yes", explore: "yes" },
  branch: { ds: "yes", data: "yes", scenarios: "yes", compare: "no", light: "no", share: "partly", setup: "partly", explore: "no" },
  lovable: { ds: "no", data: "no", scenarios: "partly", compare: "no", light: "yes", share: "yes", setup: "yes", explore: "partly" },
  storybook: { ds: "yes", data: "partly", scenarios: "partly", compare: "partly", light: "yes", share: "yes", setup: "partly", explore: "no" },
  "figma-make": { ds: "partly", data: "no", scenarios: "no", compare: "no", light: "yes", share: "yes", setup: "yes", explore: "yes" },
  protolab: { ds: "yes", data: "yes", scenarios: "yes", compare: "yes", light: "yes", share: "partly", setup: "no", explore: "partly" },
};

/** The six points the marked-up page presents: two kept from production, four added by the lab. */
export type Point = { id: string; group: "keeps" | "adds"; title: string; body: string };

export const points: Point[] = [
  { id: "ds", group: "keeps", title: "The design system that ships", body: "Notebook, installed as a package. The row, the chip and the button are the ones in production." },
  { id: "data", group: "keeps", title: "The shape of the data", body: "The agent reads the app's types first, then freezes believable data in the prototype. It never connects to production." },
  { id: "versions", group: "adds", title: "Versions side by side", body: "Two layouts of the same page, at the same size, with the same data." },
  { id: "scenarios", group: "adds", title: "Data scenarios", body: "Empty, typical, too much: one switch, no code. The worst case shows up before a user finds it." },
  { id: "link", group: "adds", title: "A link per state", body: "The URL carries the version and the data. Whoever opens it lands exactly where I was." },
  { id: "skills", group: "adds", title: "A designer in the loop", body: "The agent that builds the page also critiques, polishes and animates it, with a designer's set of skills." },
];

export const groupLabel = { keeps: "Kept from production", adds: "Added by the lab" } as const;

/**
 * The specimen the points mark up: the orders page of a shop's back office. A template every
 * visitor reads at a glance, not a page of the site.
 */
export type Order = {
  customer: string;
  items: number;
  total: number;
  status: "paid" | "shipped" | "refunded";
  date: string;
};

export type Volume = "empty" | "typical" | "many";
export const volumes: { id: Volume; label: string }[] = [
  { id: "empty", label: "Empty" },
  { id: "typical", label: "Typical" },
  { id: "many", label: "Too much" },
];

export type Layout = "rows" | "cards";
export const layouts: { id: Layout; label: string }[] = [
  { id: "rows", label: "Rows" },
  { id: "cards", label: "Cards" },
];

const typical: Order[] = [
  { customer: "Léa Martin", items: 3, total: 84, status: "paid", date: "2026-10-24" },
  { customer: "Tomás Ruiz", items: 1, total: 19.9, status: "shipped", date: "2026-10-24" },
  { customer: "Aiko Tanaka", items: 5, total: 212.4, status: "paid", date: "2026-10-23" },
  { customer: "Noah Becker", items: 2, total: 46, status: "refunded", date: "2026-10-22" },
  { customer: "Inès Haddad", items: 4, total: 128.75, status: "shipped", date: "2026-10-21" },
];

/** The worst case: a name that does not fit, a total with five digits, and a count no one scrolls. */
const worst: Order = { customer: "Maximilian Alexander-Wolfeschlegelstein", items: 48, total: 12480, status: "paid", date: "2026-10-25" };

export const orders: Record<Volume, { total: number; rows: Order[] }> = {
  empty: { total: 0, rows: [] },
  typical: { total: typical.length, rows: typical },
  many: { total: 2418, rows: [worst, ...typical] },
};

export const orderLink = (layout: Layout, volume: Volume) => `yourapp.com/lab/p/orders?a.layout=${layout}&s.volume=${volume}`;
