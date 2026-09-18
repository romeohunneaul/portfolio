"use client";

import type { ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { useAsk } from "./ask-provider";

type AskRowProps = { context: NonNullable<AskContext>; children: ReactNode };

/**
 * A row that opens the panel. At rest it is plain text; the hint shows on
 * hover and focus, and stays visible where there is no hover (touch).
 */
export function AskRow({ context, children }: AskRowProps) {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open(context)}
      data-ask-kind={context.kind}
      data-ask-id={context.id}
      className="group border-rule flex w-full cursor-pointer flex-col gap-2 border-b py-5 text-left"
    >
      {children}
      <span className="text-soft text-meta font-mono opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
        Details and questions
      </span>
    </button>
  );
}
