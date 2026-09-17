import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LogoSquare } from "./logo-square";

const meta = {
  title: "UI/LogoSquare",
  component: LogoSquare,
  args: { name: "Taster", src: "/logos/taster.png" },
} satisfies Meta<typeof LogoSquare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {};
export const Initials: Story = { args: { name: "Leah Care", src: undefined } };
export const Row: Story = {
  render: () => (
    <div className="flex gap-3">
      <LogoSquare name="Independent" />
      <LogoSquare name="Taster" src="/logos/taster.png" />
      <LogoSquare name="Leah Care" />
      <LogoSquare name="Artefact" src="/logos/artefact.png" />
    </div>
  ),
};
