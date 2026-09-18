import type { ReactNode } from "react";

type HighlightProps = { children: ReactNode; punch?: boolean };

/** A marker stroke behind a word. Decorative, so not a <mark>. */
export function Highlight({ children, punch = false }: HighlightProps) {
  const c = punch ? "var(--highlight-punch)" : "var(--highlight)";
  return (
    <span
      className="px-[2px]"
      style={{ background: `linear-gradient(transparent 14%, ${c} 14%, ${c} 86%, transparent 86%)` }}
    >
      {children}
    </span>
  );
}
