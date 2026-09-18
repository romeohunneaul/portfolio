/**
 * Readings that stuck. Books first, then articles. Add a line per read.
 * `why` is one sentence, first person, no superlatives — placeholders are
 * marked until François rewrites them.
 */

import { ledes } from "./sections";

export const readingIntro = ledes.reading;

export type Article = {
  title: string;
  author: string;
  year: number;
  url: string;
  why: string;
  kind: "book" | "article";
  tags: ("ai" | "product" | "engineering" | "design" | "writing")[];
};

export const articles: Article[] = [
  {
    title: "Getting Real",
    author: "Basecamp",
    year: 2006,
    url: "https://basecamp.com/gettingreal",
    why: "Build less, start with the interface, ship. Still the shortest book on making software.",
    kind: "book",
    tags: ["product"],
  },
  {
    title: "Shape Up",
    author: "Ryan Singer, Basecamp",
    year: 2019,
    url: "https://basecamp.com/shapeup",
    why: "Moved a whole team onto it at Taster. Appetite is the best word product has borrowed.",
    kind: "book",
    tags: ["product"],
  },
  {
    title: "Escaping the Build Trap",
    author: "Melissa Perri",
    year: 2018,
    url: "https://melissaperri.com/book",
    why: "Outputs are not outcomes. The book I hand to a team that measures itself in features.",
    kind: "book",
    tags: ["product"],
  },
  {
    title: "Continuous Discovery Habits",
    author: "Teresa Torres",
    year: 2021,
    url: "https://www.producttalk.org/continuous-discovery-habits/",
    why: "Weekly customer contact and the opportunity tree. The discovery routine I actually kept.",
    kind: "book",
    tags: ["product"],
  },
  {
    title: "Intercom on Jobs-to-be-Done",
    author: "Intercom",
    year: 2016,
    url: "https://www.intercom.com/resources/books/intercom-jobs-to-be-done",
    why: "The practical version of JTBD: the switch interview, the milkshake, and how to write a job.",
    kind: "book",
    tags: ["product"],
  },
  {
    title: "Fall in Love with the Problem, Not the Solution",
    author: "Uri Levine",
    year: 2023,
    url: "https://urilevine.com/book",
    why: "From the Waze co-founder. Keep the problem in front of you; the solution changes.",
    kind: "book",
    tags: ["product"],
  },
  {
    title: "The Bitter Lesson",
    author: "Rich Sutton",
    year: 2019,
    url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
    why: "Two pages that explain why every clever hand-built feature I shipped got eaten by more compute.",
    kind: "article",
    tags: ["ai"],
  },
  {
    title: "Software 2.0",
    author: "Andrej Karpathy",
    year: 2017,
    url: "https://karpathy.medium.com/software-2-0-a64152b37c35",
    why: "The frame I still use to explain to a team what changes when the spec becomes a dataset.",
    kind: "article",
    tags: ["ai", "engineering"],
  },
  {
    title: "Building effective agents",
    author: "Anthropic",
    year: 2024,
    url: "https://www.anthropic.com/research/building-effective-agents",
    why: "Workflows before agents. Saved me from over-building twice.",
    kind: "article",
    tags: ["ai", "engineering"],
  },
  {
    title: "Why chatbots are not the future",
    author: "Amelia Wattenberger",
    year: 2023,
    url: "https://wattenberger.com/thoughts/boo-chatbots",
    why: "A text box has no affordances. Half of my lab notes start from this.",
    kind: "article",
    tags: ["ai", "design"],
  },
  {
    title: "Principles of mixed-initiative user interfaces",
    author: "Eric Horvitz",
    year: 1999,
    url: "https://erichorvitz.com/mixedinit.htm",
    why: "The agent-versus-direct-manipulation debate was settled in 1999; we just lacked the protocol.",
    kind: "article",
    tags: ["ai", "design"],
  },
  {
    title: "Choose boring technology",
    author: "Dan McKinley",
    year: 2015,
    url: "https://mcfunley.com/choose-boring-technology",
    why: "Innovation tokens. I spend mine on the model, not the database.",
    kind: "article",
    tags: ["engineering"],
  },
  {
    title: "Things you should never do, part I",
    author: "Joel Spolsky",
    year: 2000,
    url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
    why: "Every rewrite pitch I have heard since reads differently.",
    kind: "article",
    tags: ["engineering", "product"],
  },
  {
    title: "Maker's schedule, manager's schedule",
    author: "Paul Graham",
    year: 2009,
    url: "https://paulgraham.com/makersschedule.html",
    why: "Why I stopped putting meetings at 11.",
    kind: "article",
    tags: ["product"],
  },
  {
    title: "Magic ink",
    author: "Bret Victor",
    year: 2006,
    url: "http://worrydream.com/MagicInk/",
    why: "Most software is information software, and most of it should be a picture.",
    kind: "article",
    tags: ["design"],
  },
  {
    title: "Home-cooked software and barefoot developers",
    author: "Maggie Appleton",
    year: 2024,
    url: "https://maggieappleton.com/home-cooked-software",
    why: "What the Mineral Expertise assistant is, better said than I could.",
    kind: "article",
    tags: ["ai", "product"],
  },
  {
    title: "No silver bullet",
    author: "Fred Brooks",
    year: 1986,
    url: "https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf",
    why: "Essential versus accidental complexity. LLMs eat the accidental kind.",
    kind: "article",
    tags: ["engineering"],
  },
  {
    title: "Overcoming the articulation barrier",
    author: "Nielsen Norman Group",
    year: 2023,
    url: "https://www.nngroup.com/articles/ai-articulation-barrier/",
    why: "Names the problem of the empty prompt. Hybrid interfaces as the answer.",
    kind: "article",
    tags: ["design", "ai"],
  },
  {
    title: "Software 3.0",
    author: "Andrej Karpathy",
    year: 2025,
    url: "https://www.latent.space/p/s3",
    why: "The autonomy slider and the generation/verification loop. My whole job in one talk.",
    kind: "article",
    tags: ["ai", "product"],
  },
];
