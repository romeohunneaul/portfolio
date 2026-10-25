import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Button } from "./button";
import { Tag } from "./tag";

const meta = {
  title: "UI/Tag",
  component: Tag,
  args: { children: "customer", on: true, className: "-top-6 left-0" },
  render: (args) => (
    <p className="m-0 pt-8">
      <span className="relative">
        Léa Martin
        <Tag {...args} />
      </span>
    </p>
  ),
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const On: Story = {};
export const Rest: Story = { args: { on: false } };

/** Field names over a row, staggered with `delay`. */
export const Staggered: Story = {
  render: function Render() {
    const [on, setOn] = useState(false);
    const field = (name: string, delay: string, value: string) => (
      <span className="relative">
        {value}
        <Tag on={on} delay={delay} className="-top-6 left-0">
          {name}
        </Tag>
      </span>
    );
    return (
      <div className="flex flex-col items-start gap-10">
        <Button variant="quiet" onClick={() => setOn((o) => !o)}>
          {on ? "Hide the fields" : "Show the fields"}
        </Button>
        <p className="m-0 flex gap-12">
          {field("customer", "delay-0", "Léa Martin")}
          {field("status", "delay-100", "paid")}
          {field("total", "delay-200", "€84.00")}
        </p>
      </div>
    );
  },
};
