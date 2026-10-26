import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "./button";
import { DrawnBox } from "./drawn-box";

const meta = {
  title: "UI/DrawnBox",
  component: DrawnBox,
  args: { on: true },
  render: (args) => (
    <div className="relative w-64 p-3">
      <p className="m-0">A region worth pointing at.</p>
      <DrawnBox {...args} />
    </div>
  ),
} satisfies Meta<typeof DrawnBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Drawn: Story = {};
export const Rest: Story = { args: { on: false } };

/** Toggle it: the four strokes draw one after the other, and leave together. */
export const Toggle: Story = {
  render: function Render() {
    const [on, setOn] = useState(false);
    return (
      <div className="flex flex-col items-start gap-8">
        <Button variant="quiet" onClick={() => setOn((o) => !o)}>
          {on ? "Erase" : "Draw"}
        </Button>
        <div className="relative w-72 p-3">
          <p className="m-0">Orders, a list of five, and a line that says how many are left.</p>
          <DrawnBox on={on} />
        </div>
      </div>
    );
  },
};
