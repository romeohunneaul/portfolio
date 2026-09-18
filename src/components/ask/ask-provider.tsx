"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AskContext } from "@/lib/ask/context";
import { AskDialog } from "./ask-dialog";

type AskApi = { open: (context?: AskContext) => void };

const Ctx = createContext<AskApi>({ open: () => {} });
export const useAsk = () => useContext(Ctx);

/** Reads `data-ask-kind` / `data-ask-id` from the closest marked ancestor. */
function contextFrom(target: EventTarget | null): AskContext {
  const el = target instanceof Element ? target.closest<HTMLElement>("[data-ask-kind]") : null;
  const kind = el?.dataset.askKind;
  const id = el?.dataset.askId;
  return (kind === "experience" || kind === "project") && id ? { kind, id } : null;
}

/**
 * ⌘K / Ctrl+K opens the dialog with whatever row the visitor last hovered or
 * focused. The visible "Ask" buttons do the same for touch and keyboard.
 */
export function AskProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ open: boolean; context: AskContext; session: number }>({ open: false, context: null, session: 0 });
  const hovered = useRef<AskContext>(null);

  const open = useCallback((context: AskContext = null) => {
    setState((s) => ({ open: true, context, session: s.session + 1 }));
  }, []);

  useEffect(() => {
    const track = (e: Event) => {
      hovered.current = contextFrom(e.target);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open(hovered.current);
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

  const api = useMemo(() => ({ open }), [open]);

  return (
    <Ctx.Provider value={api}>
      {children}
      {/* `key` resets the conversation each time the dialog is opened from a new place. */}
      <AskDialog key={state.session} open={state.open} context={state.context} onClose={() => setState((s) => ({ ...s, open: false }))} />
    </Ctx.Provider>
  );
}
