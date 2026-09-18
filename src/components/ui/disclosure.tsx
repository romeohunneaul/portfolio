import type { ReactNode } from "react";

type DisclosureProps = {
  id?: string;
  /** Summary content: place items in the first two columns; the third column is the +/− glyph. */
  summary: ReactNode;
  children: ReactNode;
  /** Open by default (e.g. when the URL hash targets this item). */
  open?: boolean;
};

/**
 * Native <details> with a visible affordance: a "+" that turns into "−".
 * Works without JavaScript; the row itself is the summary.
 */
export function Disclosure({ id, summary, children, open }: DisclosureProps) {
  return (
    <details id={id} open={open} className="group border-rule border-b scroll-mt-8 open:pb-5">
      <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto_auto] items-baseline gap-x-6 gap-y-1 py-4 hover:bg-[var(--accent-tint)] [&::-webkit-details-marker]:hidden">
        {summary}
        <span aria-hidden="true" className="text-soft text-title col-start-3 row-span-2 row-start-1 self-center pl-2 font-light">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      {children}
    </details>
  );
}
