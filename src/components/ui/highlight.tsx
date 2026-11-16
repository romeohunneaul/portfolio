import type { ReactNode } from "react";

type HighlightProps = { children: ReactNode };

/** The accent: weight alone, no colour (since 2026-11-16, lab "surfaces"). Decorative, so not a <strong>. */
export function Highlight({ children }: HighlightProps) {
  return <span className="font-bold">{children}</span>;
}
