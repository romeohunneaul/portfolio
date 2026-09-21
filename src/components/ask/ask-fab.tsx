"use client";

import { useEffect, useState } from "react";
import { useAsk } from "./ask-provider";
import type { AskContext } from "@/lib/ask/context";

/**
 * Phone-only floating button. Paper card with a hand-drawn ink loop that IS
 * the border — no CSS border, no separate mark. The loop redraws itself on a
 * slow cycle (see .ask-fab-loop in globals.css), the site's one-mark rule
 * extended to a standing target.
 *
 * Contextual: reads whatever [data-ask-kind] row is nearest the viewport
 * centre, so the panel opens where the visitor is reading.
 */
export function AskFab() {
  const { open } = useAsk();
  const [context, setContext] = useState<AskContext>(null);
  const [label, setLabel] = useState("Ask about François");

  useEffect(() => {
    let raf = 0;
    const pick = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      let best: HTMLElement | null = null;
      let bestD = Infinity;
      for (const el of document.querySelectorAll<HTMLElement>("[data-ask-kind][data-ask-id]")) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 80 || r.top > window.innerHeight - 80) continue;
        const d = Math.abs((r.top + r.bottom) / 2 - mid);
        if (d < bestD) {
          bestD = d;
          best = el;
        }
      }
      const kind = best?.dataset.askKind;
      const id = best?.dataset.askId;
      if ((kind === "experience" || kind === "project") && id) {
        setContext((c) => (c?.kind === kind && c.id === id ? c : { kind, id }));
        setLabel(`Ask about ${best!.querySelector<HTMLElement>(".hd")?.innerText || id}`);
      } else {
        setContext((c) => (c === null ? c : null));
        setLabel("Ask about François");
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(pick);
    };
    pick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => open(context)}
      aria-label={label}
      className="ask-fab bg-card text-ink text-meta fixed right-4 bottom-4 z-20 flex items-center justify-center px-6 py-3 font-mono uppercase sm:hidden"
    >
      {/* The loop is drawn slightly larger than the paper and cropped by the
          button's rounded shape at the corners — reads as an ink circle
          around the chip, not around a text label. */}
      <svg
        className="ask-fab-loop pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 76 52"
        preserveAspectRatio="none"
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {/* Open at the top: starts and ends near 12 o'clock, gives a handwritten feel. */}
        <path d="M42 4 C22 3 6 10 5 24 C4 39 24 49 44 47 C63 45 73 34 71 22 C69 12 58 5 40 4" pathLength={1} />
      </svg>
      <span className="relative">Ask</span>
    </button>
  );
}
