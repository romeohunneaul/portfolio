import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  tone?: "accent" | "strong" | "highlight" | "none";
};

/* Tints are strong enough to tell apart; the border keeps them readable on grain. */
const tones = {
  accent: "bg-[color-mix(in_srgb,var(--accent)_70%,transparent)]",
  strong: "bg-[color-mix(in_srgb,var(--accent-strong)_45%,transparent)]",
  highlight: "bg-[var(--highlight)]",
  none: "bg-transparent",
};

export function Chip({ children, tone = "accent" }: ChipProps) {
  return (
    <span className={`border-rule text-meta inline-block border px-2 py-0.5 font-mono whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
}
