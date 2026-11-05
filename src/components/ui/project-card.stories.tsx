import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CARD_FRAME } from "./card-frame";
import { ProjectCard } from "./project-card";

const meta = {
  title: "UI/ProjectCard",
  component: ProjectCard,
  decorators: [
    (Story) => (
      <div className={`${CARD_FRAME} max-w-sm`}>
        <Story />
      </div>
    ),
  ],
  args: {
    title: "A catalogue you can talk to",
    year: "2025–2026",
    status: "in progress",
    summary: "Tooling for independent bookshops, built with a publisher-side co-founder.",
    stack: ["Next.js", "Vercel AI SDK", "OpenRouter", "LangSmith", "Supabase", "n8n"],
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithMedia: Story = {
  args: {
    media: (
      // A plain poster: in the site the media slot holds the hover preview.
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/videos/odyssee-demo-poster.jpg" alt="" className="block h-full w-full object-cover" />
    ),
  },
};
export const TextOnly: Story = {};
export const ShortStack: Story = { args: { stack: ["Python", "MCP"] } };
export const NoStack: Story = { args: { stack: [] } };
