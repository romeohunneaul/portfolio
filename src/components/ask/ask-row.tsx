"use client";

import type { ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { useAsk } from "./ask-provider";

type AskRowProps = { context: NonNullable<AskContext>; children: ReactNode };

/**
 * A row that opens the panel. At rest it is a hairline row; on hover it lifts
 * into a card — hard offset shadow, thicker grain — and a sticker names the
 * action (see .ask-row in globals.css). On touch the sticker is simply visible.
 */
export function AskRow({ context, children }: AskRowProps) {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open(context)}
      data-ask-kind={context.kind}
      data-ask-id={context.id}
      className="ask-row group relative -mx-4 flex w-[calc(100%+2rem)] cursor-pointer flex-col gap-3 px-4 py-5 text-left"
    >
      {children}
      <span className="border-rule text-sticker self-start border-[length:var(--border)] bg-[var(--highlight)] px-2 py-1 font-mono opacity-0 shadow-[2px_2px_0_var(--ink-shadow)] transition-[opacity,rotate] duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:group-hover:-rotate-1 [@media(hover:none)]:opacity-100">
        details and questions
      </span>
    </button>
  );
}
