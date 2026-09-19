import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Logo } from "./logo";

const meta = {
  title: "UI/Logo",
  component: Logo,
  args: { size: 150 },
  argTypes: { variant: { control: "select", options: ["static", "draw", "sunset", "snow"] } },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Static: Story = {};
export const HeaderSize: Story = { args: { size: 40 } };
/** M1 — plays on load, hover to replay. */
export const DrawsItself: Story = { args: { variant: "draw" } };
/** M2 — seven-second ambient loop; the margin card one. */
export const Sunset: Story = { args: { variant: "sunset" } };
/** M3 — only reads at 150px. */
export const Snow: Story = { args: { variant: "snow" } };
