import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionLabel } from "./section-label";

const meta = {
  title: "UI/SectionLabel",
  component: SectionLabel,
  args: { children: "Lab" },
} satisfies Meta<typeof SectionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithCount: Story = { args: { children: "Lab", aside: "2 notes" } };
export const WithLink: Story = {
  args: { children: "Trail", aside: <a href="#">more →</a> },
};
