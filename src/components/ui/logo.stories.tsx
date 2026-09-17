import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta = {
  title: "UI/Logo",
  component: Logo,
  args: { size: 46 },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = {};
export const DrawsIn: Story = { args: { animate: true, size: 92 } };
