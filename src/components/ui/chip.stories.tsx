import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  args: { children: "note" },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Bare type at rest — no fill, no border. */
export const Rest: Story = {};
/** The marker stays drawn. */
export const Selected: Story = { args: { state: "selected" } };
/** 38% ink, no marker — the only state with no yellow in it. */
export const Disabled: Story = { args: { state: "disabled" } };
/** Hover the row: the swipe belongs to the container, not the chip. */
export const InsideARow: Story = {
  render: () => (
    <button type="button" className="draws border-rule flex w-full items-baseline gap-3 border-b py-4 text-left">
      <span className="font-semibold">A catalogue you can talk to</span>
      <Chip>in progress</Chip>
    </button>
  ),
};
