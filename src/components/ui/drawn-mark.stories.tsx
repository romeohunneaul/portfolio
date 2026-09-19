import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DrawnMark } from "./drawn-mark";

const meta = {
  title: "UI/DrawnMark",
  component: DrawnMark,
} satisfies Meta<typeof DrawnMark>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Hover the link: the underline draws itself, and stretches to the text. */
export const Underline: Story = {
  render: () => (
    <p className="m-0 flex gap-8">
      <a href="#" className="draws hd no-underline">
        <span>Work</span>
        <DrawnMark />
      </a>
      <a href="#" className="draws hd no-underline">
        <span>A much longer label to stretch under</span>
        <DrawnMark />
      </a>
    </p>
  ),
};
/** Hover: a hand loop around an icon-sized control. */
export const Loop: Story = {
  render: () => (
    <button type="button" aria-label="Open the panel" className="draws bg-transparent">
      <span className="hd flex size-10 items-center justify-center">
        <svg width="18" height="13" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
          <path d="M1 7h15" />
          <path d="M12 2.5L16.5 7 12 11.5" />
        </svg>
        <DrawnMark shape="loop" />
      </span>
    </button>
  ),
};
/** data-current keeps the mark drawn — nav's current page, a row whose panel is open. */
export const Current: Story = {
  render: () => (
    <span className="draws hd" data-current="true">
      <span>Outdoor</span>
      <DrawnMark />
    </span>
  ),
};
