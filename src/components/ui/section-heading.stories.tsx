import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SectionHeading } from "./section-heading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  args: { children: "Lab" },
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const WithCount: Story = { args: { children: "Lab", aside: "2 notes" } };
export const WithLink: Story = { args: { children: "Trail", aside: <a href="#">Races and routes</a> } };
