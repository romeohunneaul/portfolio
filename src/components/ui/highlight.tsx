import type { ReactNode } from "react";

type HighlightProps = { children: ReactNode; punch?: boolean };

/** A marker stroke behind a word. Sits inside the line, never a box. */
export function Highlight({ children, punch = false }: HighlightProps) {
  const c = punch ? "var(--highlight-punch)" : "var(--highlight)";
  return (
    <mark
      className="px-[2px] text-inherit"
      style={{ background: `linear-gradient(transparent 14%, ${c} 14%, ${c} 86%, transparent 86%)` }}
    >
      {children}
    </mark>
  );
}
