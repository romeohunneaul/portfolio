import { useSyncExternalStore } from "react";
import { THEME_KEY } from "./theme-script";

export type Theme = "light" | "dark";

// The DOM attribute is the single source of truth: every switch on the page reads and watches it.
const read = (): Theme => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Private mode: the switch still works for this page view.
  }
}

/** The current theme; "light" on the server, the real one once hydrated. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, read, () => "light");
}
