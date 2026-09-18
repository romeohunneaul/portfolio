import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Highlight } from "./highlight";

const meta = {
  title: "UI/Highlight",
  component: Highlight,
  render: (args) => (
    <p className="m-0 max-w-[var(--measure)] text-lede">
      The rest of the time I run <Highlight {...args}>up hills, slowly</Highlight>. Both go in the notebook.
    </p>
  ),
  args: { children: "up hills, slowly" },
} satisfies Meta<typeof Highlight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Soft: Story = {};
export const Punch: Story = { args: { punch: true } };
