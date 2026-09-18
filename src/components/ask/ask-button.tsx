"use client";

import { useAsk } from "./ask-provider";

/** Header entry: the shortcut, spelled out. */
export function AskShortcut() {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open(null)}
      className="border-rule text-meta flex items-center gap-2 border px-2.5 py-1.5 font-mono hover:bg-[var(--accent-tint)]"
    >
      Ask <kbd className="text-soft font-mono">⌘K</kbd>
    </button>
  );
}
