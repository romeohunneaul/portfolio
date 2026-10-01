import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./theme-toggle";

const meta = {
  title: "UI/ThemeToggle",
  component: ThemeToggle,
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Day: the knob rests left with the sun; the moon waits, faint, on the right. */
export const Day: Story = { globals: { theme: "light" } };
/** Night: the knob has slid right, the whole page (and this story) is in the night palette. */
export const Night: Story = { globals: { theme: "dark" } };
