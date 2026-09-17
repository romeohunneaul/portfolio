/**
 * Articles that stuck. Seeded with the classics; add a line per read.
 * `why` is one sentence, first person, no superlatives.
 */

export type Article = {
  title: string;
  author: string;
  year: number;
  url: string;
  why: string;
  tags: ("ai" | "product" | "engineering" | "design" | "writing")[];
};

export const articles: Article[] = [
  {
    title: "The Bitter Lesson",
    author: "Rich Sutton",
    year: 2019,
    url: "http://www.incompleteideas.net/IncIdeas/BitterLesson.html",
    why: "Two pages that explain why every clever hand-built feature I shipped got eaten by more compute.",
    tags: ["ai"],
  },
  {
    title: "Software 2.0",
    author: "Andrej Karpathy",
    year: 2017,
    url: "https://karpathy.medium.com/software-2-0-a64152b37c35",
    why: "The frame I still use to explain to a team what changes when the spec becomes a dataset.",
    tags: ["ai", "engineering"],
  },
  {
    title: "Building effective agents",
    author: "Anthropic",
    year: 2024,
    url: "https://www.anthropic.com/research/building-effective-agents",
    why: "Workflows before agents. Saved me from over-building twice.",
    tags: ["ai", "engineering"],
  },
  {
    title: "Why chatbots are not the future",
    author: "Amelia Wattenberger",
    year: 2023,
    url: "https://wattenberger.com/thoughts/boo-chatbots",
    why: "A text box has no affordances. Half of my lab notes start from this.",
    tags: ["ai", "design"],
  },
  {
    title: "Principles of mixed-initiative user interfaces",
    author: "Eric Horvitz",
    year: 1999,
    url: "https://erichorvitz.com/mixedinit.htm",
    why: "The agent-versus-direct-manipulation debate was settled in 1999; we just lacked the protocol.",
    tags: ["ai", "design"],
  },
  {
    title: "Choose boring technology",
    author: "Dan McKinley",
    year: 2015,
    url: "https://mcfunley.com/choose-boring-technology",
    why: "Innovation tokens. I spend mine on the model, not the database.",
    tags: ["engineering"],
  },
  {
    title: "Things you should never do, part I",
    author: "Joel Spolsky",
    year: 2000,
    url: "https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/",
    why: "Every rewrite pitch I have heard since reads differently.",
    tags: ["engineering", "product"],
  },
  {
    title: "Maker's schedule, manager's schedule",
    author: "Paul Graham",
    year: 2009,
    url: "https://paulgraham.com/makersschedule.html",
    why: "Why I stopped putting meetings at 11.",
    tags: ["product"],
  },
  {
    title: "Shape Up",
    author: "Ryan Singer",
    year: 2019,
    url: "https://basecamp.com/shapeup",
    why: "Moved a whole team onto it at Taster. Appetite is the best word product has borrowed.",
    tags: ["product"],
  },
  {
    title: "Magic ink",
    author: "Bret Victor",
    year: 2006,
    url: "http://worrydream.com/MagicInk/",
    why: "Most software is information software, and most of it should be a picture.",
    tags: ["design"],
  },
  {
    title: "Home-cooked software and barefoot developers",
    author: "Maggie Appleton",
    year: 2024,
    url: "https://maggieappleton.com/home-cooked-software",
    why: "What the Mineral Expertise assistant is, better said than I could.",
    tags: ["ai", "product"],
  },
  {
    title: "No silver bullet",
    author: "Fred Brooks",
    year: 1986,
    url: "https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf",
    why: "Essential versus accidental complexity. LLMs eat the accidental kind.",
    tags: ["engineering"],
  },
  {
    title: "Overcoming the articulation barrier",
    author: "Nielsen Norman Group",
    year: 2023,
    url: "https://www.nngroup.com/articles/ai-articulation-barrier/",
    why: "Names the problem of the empty prompt. Hybrid interfaces as the answer.",
    tags: ["design", "ai"],
  },
  {
    title: "Software 3.0",
    author: "Andrej Karpathy",
    year: 2025,
    url: "https://www.latent.space/p/s3",
    why: "The autonomy slider and the generation/verification loop. My whole job in one talk.",
    tags: ["ai", "product"],
  },
];
