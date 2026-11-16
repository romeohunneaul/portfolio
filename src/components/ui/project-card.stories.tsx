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
    stack: ["Next.js", "Vercel AI SDK", "OpenRouter", "LangSmith", "Supabase", "n8n"],
    image: { src: "/projects/odyssee.jpg", alt: "OdysseeAI sign-in screen over a light grid" },
    more: "See the project",
  },
} satisfies Meta<typeof ProjectCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {};
export const NoImage: Story = { args: { image: undefined } };
export const LongTitle: Story = { args: { title: "An assistant for cryogenic sample storage" } };
export const ShortStack: Story = { args: { stack: ["Python", "MCP"] } };
export const NoStack: Story = { args: { stack: [] } };
