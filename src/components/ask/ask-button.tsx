"use client";

import type { AskContext } from "@/lib/ask/context";
import { useAsk } from "./ask-provider";

type AskButtonProps = { context?: AskContext; children?: string; className?: string };

/** The visible way in: works on touch and keyboard, where ⌘K over a row does not. */
export function AskButton({ context = null, children = "Ask", className = "" }: AskButtonProps) {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault(); // inside a <summary>, do not toggle the row
        open(context);
      }}
      className={`text-soft text-meta hover:text-ink font-mono underline decoration-[var(--ink-rule)] underline-offset-4 ${className}`}
    >
      {children}
    </button>
  );
}

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
