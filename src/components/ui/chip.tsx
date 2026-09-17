import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  tone?: "accent" | "strong" | "highlight" | "none";
};

const tones = {
  accent: "bg-[var(--accent-tint)]",
  strong: "bg-[var(--accent-strong-tint)]",
  highlight: "bg-[var(--highlight-tint)]",
  none: "border-rule border-[length:var(--border)]",
};

/** Mono, tiny, tinted — never filled. */
export function Chip({ children, tone = "accent" }: ChipProps) {
  return (
    <span className={`inline-block px-[7px] py-[2px] font-mono text-[length:var(--size-caption)] whitespace-nowrap ${tones[tone]}`}>
      {children}
    </span>
  );
}
