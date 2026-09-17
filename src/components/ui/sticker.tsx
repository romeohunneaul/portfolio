import type { ReactNode } from "react";

type StickerProps = { children: ReactNode; rotate?: number };

/** One per page, at most. Tilted, hard shadow, marker background. */
export function Sticker({ children, rotate = -3 }: StickerProps) {
  return (
    <span
      className="border-rule inline-block border-[length:var(--border)] bg-[var(--highlight)] px-[10px] py-[5px] font-mono text-[length:var(--size-caption)] shadow-[3px_3px_0_var(--ink-shadow)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
