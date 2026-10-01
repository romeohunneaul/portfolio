/** One sentence per section: the lede of its page, and the subheading of its block on the home page. */
export const ledes = {
  work: "Ten years of product work, the last two building alone with an agent at my side.",
  lab: "Notes and small experiments on putting AI inside tools people already use.",
  outdoor: "Routes I would send a friend on. Each one is a GPX you can take; photos follow when I sort them.",
  reading:
    "I don't write well, and I won't have an AI write for me. So instead of articles, here is a digest of what helped me most, at work and outside it.",
  listening: "What is playing while I work, this month.",
} as const;

/**
 * The home's opening: one broad question, one field, the notebook one scroll below.
 * `examples` rotate as the placeholder. Each starter fills the field with its example:
 * as a chip on desktop (when it has one), as a row of the "Examples" sheet on phones.
 */
export const askHome = {
  intro:
    "10 years in product and AI in business software. The rest of the time I am in the mountains, reading nerd articles, or listening to music. All of it ends up in this notebook.",
  title: { before: "How can I ", mark: "help", after: "?" },
  label: "Describe what you need",
  examples: [
    "We're hiring a PM to ship an AI feature in our B2B tool…",
    "Our onboarding loses half the users in week one…",
    "Could an agent draft replies to our support tickets?",
  ],
  starters: [
    { chip: "I'm hiring…", label: "I'm hiring", hint: "a role, a team", icon: "pencil", example: "We're hiring a PM to ship an AI feature in our B2B tool…" },
    { chip: "I have a product problem…", label: "A product problem", hint: "something's stuck", icon: "squiggle", example: "Our onboarding loses half the users in week one…" },
    { chip: "I want AI in a tool…", label: "AI in a tool", hint: "an idea to test", icon: "spark", example: "Could an agent draft replies to our support tickets?" },
    { chip: null, label: "Just curious", hint: "the person", icon: "book", example: "Who is François, in a few lines?" },
  ],
  examplesLabel: "Examples",
  sheetTitle: "Start from",
  helper: "An agent answers from what I've actually done: the projects, notes and readings in this notebook.",
  classic: "or read the notebook",
} as const;
