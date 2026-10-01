"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { AskDialog } from "./ask-dialog";

type AskApi = {
  /** `question` is sent as soon as the panel opens (the home's field). */
  open: (context?: AskContext, question?: string) => void;
  /** The context whose panel is open right now — rows keep their loop drawn. */
  current: AskContext;
};

const Ctx = createContext<AskApi>({ open: () => {}, current: null });
export const useAsk = () => useContext(Ctx);

/** Reads `data-ask-kind` / `data-ask-id` from the closest marked ancestor. */
function contextFrom(target: EventTarget | null): AskContext {
  const el = target instanceof Element ? target.closest<HTMLElement>("[data-ask-kind]") : null;
  const kind = el?.dataset.askKind;
  const id = el?.dataset.askId;
  return (kind === "experience" || kind === "project") && id ? { kind, id } : null;
}

/**
 * ⌘K / Ctrl+K opens the panel with whatever row the visitor last hovered or
 * focused (on the home with none, it focuses the ask box). Rows themselves open it on click.
 */
export function AskProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; context: AskContext; question?: string; session: number }>({
    open: false,
    context: null,
    session: 0,
  });
  const hovered = useRef<AskContext>(null);

  const open = useCallback((context: AskContext = null, question?: string) => {
    setState((s) => ({ open: true, context, question, session: s.session + 1 }));
  }, []);

  useEffect(() => {
    const track = (e: Event) => {
      hovered.current = contextFrom(e.target);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // On the home, with no row in hand, ⌘K goes to the hero's ask box rather than the panel.
        const composer = document.getElementById("ask-home");
        if (!hovered.current && composer) composer.focus();
        else open(hovered.current);
      }
    };
    document.addEventListener("pointerover", track);
    document.addEventListener("focusin", track);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerover", track);
      document.removeEventListener("focusin", track);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const api = useMemo(() => ({ open, current: state.open ? state.context : null }), [open, state.open, state.context]);

  return (
    <Ctx.Provider value={api}>
      {children}
      {/* `key` resets the conversation each time the panel is opened from a new place. */}
      <AskDialog key={state.session} open={state.open} context={state.context} question={state.question} onClose={() => setState((s) => ({ ...s, open: false }))} />
    </Ctx.Provider>
  );
}
