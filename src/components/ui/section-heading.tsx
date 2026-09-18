import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  /** Right-hand annotation: a count, a source, a link. Kept out of the heading's accessible name. */
  aside?: ReactNode;
  id?: string;
};

/** A real heading — 19px, weight 600 — with a hairline under it to close the block. */
export function SectionHeading({ children, aside, id }: SectionHeadingProps) {
  return (
    <div className="border-rule flex items-baseline justify-between gap-4 border-b-[length:var(--border)] pb-3">
      <h2 id={id} className="text-title m-0 font-semibold">
        {children}
      </h2>
      {aside && <span className="text-soft text-meta font-mono">{aside}</span>}
    </div>
  );
}
