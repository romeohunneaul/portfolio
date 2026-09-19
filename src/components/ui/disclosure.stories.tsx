import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";
import { Disclosure } from "./disclosure";

const meta = {
  title: "UI/Disclosure",
  component: Disclosure,
  args: {
    summary: (
      <>
        <span className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-semibold">A catalogue you can talk to</span>
          <Chip>in progress</Chip>
        </span>
        <span className="text-soft text-meta font-mono">2025–2026</span>
        <span className="col-span-2">Tooling for independent bookshops.</span>
      </>
    ),
    children: <p className="m-0 max-w-[var(--measure)]">Publisher feeds are poor: most new titles arrive without a cover.</p>,
  },
} satisfies Meta<typeof Disclosure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};
export const Open: Story = { args: { open: true } };
