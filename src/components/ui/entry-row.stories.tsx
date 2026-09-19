import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";
import { EntryRow } from "./entry-row";
import { Mark } from "./mark";

const meta = {
  title: "UI/EntryRow",
  component: EntryRow,
  args: { title: "Books that stuck", meta: "6 of them" },
} satisfies Meta<typeof EntryRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const Linked: Story = { args: { href: "/reading" } };
export const External: Story = {
  args: { title: "The Bitter Lesson — Rich Sutton", meta: "2019", href: "https://example.com" },
};
export const WithMark: Story = {
  args: {
    title: "Trail — 1,240 m of climbing this week",
    mark: <Mark name="elevation" className="text-accent-strong" />,
    meta: "live from garmin",
  },
};
export const WithChipAndDetail: Story = {
  args: {
    title: "A catalogue you can talk to",
    mark: <Chip>in progress</Chip>,
    meta: "2025–2026",
    detail: "Tooling for independent bookshops, built with a publisher-side co-founder.",
  },
};
export const List: Story = {
  render: () => (
    <div>
      <EntryRow title="Now — rebuilding this site in public" meta="sep 2026" />
      <EntryRow title="Trail — 1,240 m this week" meta="garmin" mark={<Mark name="elevation" className="text-accent-strong" />} />
      <EntryRow title="Books that stuck" meta="6 of them" href="/reading" />
    </div>
  ),
};
