import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  /** selected keeps the marker drawn; disabled drops to 38% with no marker. */
  state?: "rest" | "selected" | "disabled";
  /** @deprecated ignored — chips are bare type; the marker belongs to interaction. */
  tone?: string;
};

/**
 * Bare mono type at rest — soft ink, no fill, no border. The skewed marker
 * swipes in when the enclosing `.draws` row or card is hovered, and stays for
 * `selected`. What separates a chip from copy is the mono face, nothing else.
 */
export function Chip({ children, state = "rest" }: ChipProps) {
  return (
    <span className="chip text-meta relative inline-block px-[7px] py-[2px] font-mono whitespace-nowrap" data-state={state}>
      <i aria-hidden="true" />
      <span className="relative">{children}</span>
    </span>
  );
}
