import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StackGrid } from "./stack-grid";

const meta = {
  title: "Sections/StackGrid",
  component: StackGrid,
} satisfies Meta<typeof StackGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToolsOnly: Story = {};
export const WithSkills: Story = { args: { withSkills: true } };
