import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  args: { children: "demo", tone: "accent" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {};
export const Strong: Story = { args: { tone: "strong", children: "open source" } };
export const Highlight: Story = { args: { tone: "highlight", children: "in progress" } };
export const Outline: Story = { args: { tone: "none", children: "Prisma" } };

export const AllTones: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip>accent</Chip>
      <Chip tone="strong">strong</Chip>
      <Chip tone="highlight">highlight</Chip>
      <Chip tone="none">none</Chip>
    </div>
  ),
};
