import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Timeline } from "./timeline";

const meta = {
  title: "Sections/Timeline",
  component: Timeline,
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Compact: Story = { args: { variant: "compact" } };
export const Full: Story = { args: { variant: "full" } };
