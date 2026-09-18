"use client";

import type { ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { useAsk } from "./ask-provider";

type AskRowProps = { context: NonNullable<AskContext>; children: ReactNode };

/**
 * A row that opens the panel. The outlined arrow at the right is the standing
 * target; hover sweeps a marker under the title (`.ask-title` inside children)
 * and fills the arrow. See .ask-row in globals.css.
 */
export function AskRow({ context, children }: AskRowProps) {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open(context)}
      data-ask-kind={context.kind}
      data-ask-id={context.id}
      className="ask-row group border-rule flex w-full cursor-pointer items-center gap-6 border-b py-5 text-left"
    >
      <span className="min-w-0 flex-1">{children}</span>
      <span
        aria-hidden="true"
        className="ask-arrow border-rule flex size-10 shrink-0 items-center justify-center border-[length:var(--border)] transition-colors duration-200"
      >
        <svg width="20" height="14" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 8h20" />
          <path d="M15 2l7 6-7 6" />
        </svg>
      </span>
    </button>
  );
}
