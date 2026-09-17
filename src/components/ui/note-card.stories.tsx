import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NoteCard } from "./note-card";

const meta = {
  title: "UI/NoteCard",
  component: NoteCard,
  args: {
    title: "Where the chat ends and the interface begins",
    summary: "An agent that turns a sentence into filters on the grid — it proposes, the interface stays in charge.",
    date: "2026-08-27",
    tags: ["demo", "ai-ux"],
    slug: "where-the-chat-ends",
  },
} satisfies Meta<typeof NoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linked: Story = {};
export const NoSlug: Story = { args: { slug: undefined } };
export const Bare: Story = { args: { summary: undefined, tags: [], date: undefined } };
