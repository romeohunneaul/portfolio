"use client";

import type { ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { useAsk } from "./ask-provider";

type AskRowProps = { context: NonNullable<AskContext>; children: ReactNode };

/**
 * A row that opens the panel. A bare arrow at the right edge is the standing
 * target; hover or focus draws a hand loop around it (and the row's `.hd`
 * title takes its drawn underline). The loop stays while the panel is open.
 * No colour change, no written CTA — the one-mark rule.
 */
export function AskRow({ context, children }: AskRowProps) {
  const { open, current } = useAsk();
  const isCurrent = current?.kind === context.kind && current?.id === context.id;
  return (
    <button
      type="button"
      onClick={() => open(context)}
      data-ask-kind={context.kind}
      data-ask-id={context.id}
      data-current={isCurrent || undefined}
      className="draws border-rule flex w-full cursor-pointer items-center gap-6 border-b py-5 text-left"
    >
      <span className="min-w-0 flex-1">{children}</span>
      <span aria-hidden="true" className="hd flex size-10 shrink-0 items-center justify-center">
        <svg width="18" height="13" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
          <path d="M1 7h15" />
          <path d="M12 2.5L16.5 7 12 11.5" />
        </svg>
        <DrawnMark shape="loop" />
      </span>
    </button>
  );
}
