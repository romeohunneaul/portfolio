import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  /** Right-hand annotation: a count, a source, a link. Kept out of the heading's accessible name. */
  aside?: ReactNode;
  /** One sentence under the heading: what this block is, in the author's voice. */
  lede?: string;
  id?: string;
};

/** A real heading — 19px, weight 600 — a hairline to close it, and an optional sentence under it. */
export function SectionHeading({ children, aside, lede, id }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="border-rule flex items-baseline justify-between gap-4 border-b-[length:var(--border)] pb-3">
        <h2 id={id} className="text-title m-0 font-semibold">
          {children}
        </h2>
        {aside && <span className="text-soft text-meta font-mono">{aside}</span>}
      </div>
      {lede && <p className="text-soft m-0 max-w-[var(--measure)]">{lede}</p>}
    </div>
  );
}
