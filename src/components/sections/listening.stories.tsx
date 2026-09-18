import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Listening } from "./listening";

const meta = {
  title: "Sections/Listening",
  component: Listening,
} satisfies Meta<typeof Listening>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Renders the fallback until a playlist id is set in src/data/music.ts. */
export const Current: Story = {};
