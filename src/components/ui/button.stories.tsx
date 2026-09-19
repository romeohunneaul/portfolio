import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Read the note" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ink box; hover drops the hard shadow and nudges. Never a fill. */
export const Outlined: Story = {};
export const OutlinedDisabled: Story = { args: { disabled: true, children: "Not yet written" } };
/** A faint drawn line at rest; the ink copy swipes over it on hover. */
export const Quiet: Story = { args: { variant: "quiet", children: "Ask me directly" } };
