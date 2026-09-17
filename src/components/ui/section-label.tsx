import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
  /** Right-hand annotation: a count, a source, a link. */
  aside?: ReactNode;
  id?: string;
};

/** The only hierarchy device: an 11px tracked label and a hairline to the edge. */
export function SectionLabel({ children, aside, id }: SectionLabelProps) {
  return (
    <h2
      id={id}
      className="text-soft flex items-baseline gap-3 font-mono text-[length:var(--size-caption)] font-normal tracking-[var(--track-label)] uppercase"
    >
      <span>{children}</span>
      <span aria-hidden="true" className="bg-rule h-px flex-1" />
      {aside && <span className="normal-case tracking-normal">{aside}</span>}
    </h2>
  );
}
