import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Mark, type MarkName } from "./mark";

const names: MarkName[] = ["arrow", "elevation", "mountain", "check", "squiggle", "book", "bubble", "pencil", "spark"];

const meta = {
  title: "UI/Mark",
  component: Mark,
  args: { name: "arrow" },
  argTypes: { name: { control: "select", options: names } },
} satisfies Meta<typeof Mark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const One: Story = {};
export const Library: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6 sm:grid-cols-5">
      {names.map((n) => (
        <div key={n} className="flex flex-col items-start gap-2">
          <Mark name={n} />
          <span className="text-soft font-mono text-[length:var(--size-caption)]">{n}</span>
        </div>
      ))}
    </div>
  ),
};
export const InAccent: Story = { args: { name: "elevation", className: "text-accent-strong", scale: 1.5 } };
