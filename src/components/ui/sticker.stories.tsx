import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sticker } from "./sticker";

const meta = {
  title: "UI/Sticker",
  component: Sticker,
  args: { children: "work in progress" },
} satisfies Meta<typeof Sticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StruckWord: Story = {
  render: () => (
    <Sticker>
      no resume here <s>sorry</s>
    </Sticker>
  ),
};
