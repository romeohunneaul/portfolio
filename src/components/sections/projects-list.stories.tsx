import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProjectsList } from "./projects-list";

const meta = {
  title: "Sections/ProjectsList",
  component: ProjectsList,
} satisfies Meta<typeof ProjectsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = { args: { variant: "compact", limit: 4 } };
export const Full: Story = { args: { variant: "full" } };
