"use client";

import type { ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { CARD_FRAME } from "@/components/ui/card-frame";
import { useAsk } from "./ask-provider";

type AskRowProps = { context: NonNullable<AskContext>; children: ReactNode };

/** What every panel trigger shares: open on click, and mark itself while its panel is open. */
function useAskTrigger(context: NonNullable<AskContext>) {
  const { open, current } = useAsk();
  const isCurrent = current?.kind === context.kind && current?.id === context.id;
  return {
    type: "button" as const,
    onClick: () => open(context),
    "data-ask-kind": context.kind,
    "data-ask-id": context.id,
    "data-current": isCurrent || undefined,
  };
}

/**
 * A row that opens the panel. A bare arrow at the right edge, level with the
 * title's first line, is the standing target; hover or focus draws a hand loop around it (and the row's `.hd`
 * title takes its drawn underline). The loop stays while the panel is open.
 * No colour change, no written CTA — the one-mark rule.
 */
export function AskRow({ context, children }: AskRowProps) {
  return (
    <button {...useAskTrigger(context)} className="draws border-rule relative flex w-full cursor-pointer items-start gap-6 border-b py-4 text-left sm:py-5">
      <span className="min-w-0 flex-1">{children}</span>
      {/* Phone: the arrow sits over the top-right corner, so the lines under the title run the full width;
          the row's first line leaves room for it (Timeline's `trigger`). */}
      <span aria-hidden="true" className="absolute top-3 right-0 sm:static sm:-mt-2">
        <span className="hd flex size-8 shrink-0 items-center justify-center sm:size-10">
          <svg width="18" height="13" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
            <path d="M1 7h15" />
            <path d="M12 2.5L16.5 7 12 11.5" />
          </svg>
          <DrawnMark shape="loop" />
        </span>
      </span>
    </button>
  );
}

type AskCardProps = AskRowProps & {
  /** From the `sm` breakpoint the card lays its parts out in a row (a `wide` ProjectCard). */
  wide?: boolean;
};

/** A card that opens the panel: the whole card is the target, its title takes the drawn underline. */
export function AskCard({ context, children, wide = false }: AskCardProps) {
  return (
    <button {...useAskTrigger(context)} className={`${CARD_FRAME} h-full w-full cursor-pointer text-left ${wide ? "sm:flex-row" : ""}`}>
      {children}
    </button>
  );
}
