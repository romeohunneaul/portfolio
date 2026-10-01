import * as React from "react";
import { ThemeToggle } from "portfolio";

// Storybook themes this story through a toolbar global the preview can't read: set the same
// attribute the site's head script sets, and restore it on unmount.
function Night() {
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const prev = root.dataset.theme;
    root.dataset.theme = "dark";
    return () => {
      if (prev) root.dataset.theme = prev;
      else delete root.dataset.theme;
    };
  }, []);
  return (
    <div style={{ background: "var(--paper)", padding: 24 }}>
      <ThemeToggle />
    </div>
  );
}

export const Day = () => <ThemeToggle />;
export { Night };
