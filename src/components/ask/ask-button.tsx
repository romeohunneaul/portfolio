"use client";

import { useAsk } from "./ask-provider";

/** Header entry: the shortcut, spelled out. */
export function AskShortcut() {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open(null)}
      className="btn text-meta gap-2 font-mono"
    >
      Ask <kbd className="text-soft font-mono">⌘K</kbd>
    </button>
  );
}
