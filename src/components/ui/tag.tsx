import type { ReactNode } from "react";

type TagProps = { children: ReactNode; on: boolean; className?: string; delay?: string };

/**
 * A small mono label pinned on a specimen: a component's name, a field's name. Punch marker behind
 * it, since it carries meaning. Absolute: the parent is `relative`, `className` places it; `delay`
 * (a `delay-*` class) staggers several tags.
 */
export function Tag({ children, on, className = "", delay = "" }: TagProps) {
  return (
    <span
      aria-hidden={!on}
      className={`text-meta text-ink pointer-events-none absolute z-20 bg-[var(--highlight-punch)] px-1 font-mono whitespace-nowrap transition-[opacity,translate] duration-[var(--swipe-duration)] ease-[var(--swipe-ease)] motion-reduce:translate-y-0 ${delay} ${
        on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
      } ${className}`}
    >
      {children}
    </span>
  );
}
