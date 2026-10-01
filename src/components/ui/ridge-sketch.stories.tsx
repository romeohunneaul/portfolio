import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RidgeSketch } from "./ridge-sketch";

const meta = {
  title: "UI/RidgeSketch",
  component: RidgeSketch,
} satisfies Meta<typeof RidgeSketch>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Day: the ridge traces itself, the snow lines follow, then the sun and its rays. */
export const Day: Story = { globals: { theme: "light" } };
/** Night: same ridge as a silhouette, a crescent and stars instead of the sun. */
export const Night: Story = { globals: { theme: "dark" } };
