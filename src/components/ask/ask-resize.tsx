"use client";

import { useEffect, useState, type RefObject } from "react";

type AskResizeProps = { panel: RefObject<HTMLDialogElement | null> };

const KEY = "ask-width";
const BASE = 460;
const MIN = 360;
const MAX = 960;
const STEP = 24;
const clamp = (w: number) => Math.round(Math.max(MIN, Math.min(MAX, window.innerWidth - 80, w)));

/**
 * The Ask panel's left edge, on wider screens: drag it, or focus it and use the arrows; a double click
 * goes back to the default width. The width is remembered in this browser only (a convenience).
 */
export function AskResize({ panel }: AskResizeProps) {
  const [width, setWidth] = useState(BASE);

  const apply = (w: number) => {
    const v = clamp(w);
    panel.current?.style.setProperty("--ask-w", `${v}px`);
    setWidth(v);
    return v;
  };
  const save = (v: number | null) => {
    try {
      if (v === null) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, String(v));
    } catch {}
  };

  // The stored width is only known in the browser: apply it once the panel exists.
  useEffect(() => {
    let stored = 0;
    try {
      stored = Number(localStorage.getItem(KEY));
    } catch {}
    if (!stored) return;
    const v = clamp(stored);
    panel.current?.style.setProperty("--ask-w", `${v}px`);
    const id = requestAnimationFrame(() => setWidth(v));
    return () => cancelAnimationFrame(id);
  }, [panel]);

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize the panel"
      aria-valuenow={width}
      aria-valuemin={MIN}
      aria-valuemax={MAX}
      tabIndex={0}
      onPointerDown={(e) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) apply(window.innerWidth - e.clientX);
      }}
      onPointerUp={(e) => {
        if (e.currentTarget.hasPointerCapture(e.pointerId)) save(apply(window.innerWidth - e.clientX));
      }}
      onDoubleClick={() => {
        apply(BASE);
        save(null);
      }}
      onKeyDown={(e) => {
        const d = e.key === "ArrowLeft" ? STEP : e.key === "ArrowRight" ? -STEP : 0;
        if (!d) return;
        e.preventDefault();
        save(apply(width + d));
      }}
      className="group absolute inset-y-0 left-0 z-10 w-3 cursor-col-resize touch-none select-none focus-visible:outline-none max-sm:hidden"
    >
      <span
        aria-hidden="true"
        className="bg-rule/60 group-hover:bg-ink group-focus-visible:bg-ink absolute top-1/2 left-1 h-10 w-1 -translate-y-1/2 rounded-full transition-colors"
      />
    </div>
  );
}
