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
  /** The card's thumbnail, 16:10, in `public/projects/<slug>.jpg`. */
  image?: { src: string; alt: string };
  /** A short demo film, shown at the top of the panel. Files live in `public/videos/`. */
  video?: { src: string; poster: string; label: string };
  /** Three questions a visitor would actually ask here — each answerable from this file. */
  questions: string[];
  status: "shipped" | "in progress" | "prototype" | "open source";
};

export const projects: Project[] = [
  {
    slug: "odyssee",
    questions: [
      "What problem do booksellers have with publisher feeds?",
      "Where does the LLM come in, and how is it traced?",
      "What is next on the roadmap?",
    ],
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
      "An agent that turns a sentence into filters on the grid, answers about a book from its catalogue record and fills the cart — it proposes, the interface stays in charge.",
    ],
    stack: ["Next.js", "Vercel AI SDK", "OpenRouter", "LangSmith", "Supabase", "n8n", "Playwright"],
    image: { src: "/projects/odyssee.jpg", alt: "OdysseeAI sign-in screen over a light grid" },
    video: {
      src: "/videos/odyssee-demo.mp4",
      poster: "/videos/odyssee-demo-poster.jpg",
      label:
        "52-second demo: a bookseller asks the assistant for climate titles, it filters the grid, answers a question about the author and adds the book to the cart.",
    },
    status: "in progress",
  },
  {
    slug: "portfolio-manon",
    questions: [
      "How does Manon add a new shoot?",
      "How do the photos stay sharp on a phone?",
      "What happens when she publishes in Sanity?",
    ],
    title: "A photographer's site she runs herself",
    year: "2026",
    role: "Product, design, build",
    context: "Portfolio for Manon Battut, outdoor photographer. French and English, photos first, built for the phone.",
    problem:
      "Her work is seen on a phone, from an Instagram link. Photos must open full-screen and sharp on a small screen, and she must add a shoot herself, without a developer.",
    approach: [
      "Content lives in Sanity: projects, photos, categories and both languages are edited in the Studio. Publishing calls a signed webhook that refreshes only the site's cached content.",
      "Mobile first: the opening photo has its own crop for phones, and each photo loads at the size of the screen from Sanity's CDN, quality 90.",
      "Next.js 16 with Cache Components on Vercel: pages stay static until she publishes, and each branch gets a preview link she can open.",
      "Eight home layouts were compared side by side in a Protolab lab before one went live: an airy slideshow.",
    ],
    stack: ["Sanity", "Vercel", "Next.js", "Tailwind", "TypeScript"],
    image: { src: "/projects/portfolio-manon.jpg", alt: "Home of Manon Battut's portfolio: “Photographe outdoor” over a cyclist at dusk" },
    links: [{ label: "live", url: "https://portfolio-manon-two.vercel.app" }],
    status: "shipped",
  },
  {
    slug: "cryospace",
    questions: [
      "Why is the data model the hard part here?",
      "What happens when a tank reports an anomaly?",
      "What does the stack look like?",
    ],
    title: "An assistant for cryogenic sample storage",
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
    image: { src: "/projects/cryospace.jpg", alt: "Freezer inventory: shelves, racks and boxes with their fill rate, and the placement assistant" },
    status: "shipped",
  },
  {
    slug: "this-site",
    questions: [
      "How is this site built?",
      "What does the MCP server expose?",
      "How are the GPX traces drawn?",
    ],
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
    image: { src: "/projects/this-site.jpg", alt: "Home of this notebook: “How can I help?” over the Ask box" },
    links: [{ label: "github", url: "https://github.com/romeohunneaul/portfolio" }],
    status: "in progress",
  },
];
