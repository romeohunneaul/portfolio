import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const notes = defineCollection({
  name: "notes",
  directory: "content/notes",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const mdx = await compileMDX(ctx, doc);
    return {
      ...doc,
      mdx,
      slug: doc._meta.path,
    };
  },
});

export default defineConfig({ content: [notes] });
