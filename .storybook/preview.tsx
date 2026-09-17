import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    a11y: { test: "error" },
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="bg-paper text-ink p-6" style={{ backgroundImage: "var(--paper-grain)" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
