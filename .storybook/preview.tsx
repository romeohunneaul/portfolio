import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: { disable: true },
    a11y: { test: "error" },
    layout: "padded",
  },
  // Toolbar switch for the night palette. A story can pin it with `globals: { theme: "dark" }`.
  globalTypes: {
    theme: {
      description: "Day / night palette",
      toolbar: { icon: "mirror", items: [{ value: "light", title: "Day" }, { value: "dark", title: "Night" }], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, { globals }) => {
      // Same attribute the site's head script sets, so tokens flip exactly as in production.
      document.documentElement.dataset.theme = globals.theme === "dark" ? "dark" : "light";
      return (
        <div className="bg-paper text-ink p-6" style={{ backgroundImage: "var(--paper-grain)" }}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
