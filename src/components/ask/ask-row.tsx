"use client";

import type { PointerEvent, ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { useAsk } from "./ask-provider";

type AskRowProps = { context: NonNullable<AskContext>; children: ReactNode };

/** The wash follows the pointer; CSS paints it (see .ask-row in globals.css). */
function track(e: PointerEvent<HTMLButtonElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/**
 * A row that opens the panel. At rest it is plain text. On hover, a soft wash
 * of accent follows the pointer — a marker passing over paper — and the hint
 * rises in. On touch the hint is simply visible.
 */
export function AskRow({ context, children }: AskRowProps) {
  const { open } = useAsk();
  return (
    <button
      type="button"
      onClick={() => open(context)}
      onPointerMove={track}
      data-ask-kind={context.kind}
      data-ask-id={context.id}
      className="ask-row group border-rule relative flex w-full cursor-pointer flex-col gap-2 border-b py-5 text-left"
    >
      {children}
      <span className="text-soft text-meta font-mono opacity-0 transition-[opacity,translate] duration-300 ease-out group-hover:opacity-100 group-focus-visible:opacity-100 motion-safe:translate-y-1 motion-safe:group-hover:translate-y-0 motion-safe:group-focus-visible:translate-y-0 [@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100">
        Details and questions
      </span>
    </button>
  );
}
