import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeliveryPipeline } from "./delivery-pipeline";

const meta = {
  title: "Sections/DeliveryPipeline",
  component: DeliveryPipeline,
} satisfies Meta<typeof DeliveryPipeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
