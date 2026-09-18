import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsList } from "./projects-list";

const meta = {
  title: "Sections/ProjectsList",
  component: ProjectsList,
} satisfies Meta<typeof ProjectsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
export const FirstThree: Story = { args: { limit: 3 } };
