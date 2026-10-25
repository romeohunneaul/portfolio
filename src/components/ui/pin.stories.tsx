import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Pin } from "./pin";

const meta = {
  title: "UI/Pin",
  component: Pin,
  args: { n: 1, on: false, onClick: () => {}, label: "The header", className: "top-2 left-2" },
  render: (args) => (
    <div className="border-ink relative h-24 w-64 border-[length:var(--border)]">
      <Pin {...args} />
    </div>
  ),
} satisfies Meta<typeof Pin>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rest: Story = {};
export const On: Story = { args: { on: true } };

const SPOTS = [
  { label: "The header", className: "-top-3 -right-3" },
  { label: "The list", className: "top-12 -left-3" },
  { label: "The footer", className: "-bottom-3 right-6" },
];

/** Pick a number: one pin on at a time, the way a legend drives them. */
export const Specimen: Story = {
  render: function Render() {
    const [on, setOn] = useState(1);
    return (
      <div className="border-ink bg-card relative h-48 w-80 border-[length:var(--border)] shadow-[var(--shadow-rest)]">
        {SPOTS.map((s, i) => (
          <Pin key={s.label} n={i + 1} on={on === i + 1} onClick={() => setOn(i + 1)} label={s.label} className={s.className} />
        ))}
      </div>
    );
  },
};
