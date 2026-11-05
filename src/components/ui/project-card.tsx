import type { ReactNode } from "react";
import { Chip } from "./chip";
import { DrawnMark } from "./drawn-mark";

type ProjectCardProps = {
  title: string;
  year: string;
  status: string;
  summary: string;
  stack?: string[];
  /** 16:9, full width at the top of the card. */
  media?: ReactNode;
  /** From the `sm` breakpoint, media on the left half and the text beside it. The frame must turn to a row too. */
  wide?: boolean;
};

const STACK_SHOWN = 4;

/**
 * A problem worked on, as a card: media when there is one, then when and where it stands, the title,
 * three lines at most, and the stack. Spans only, so it can sit inside the button that opens the panel.
 */
export function ProjectCard({ title, year, status, summary, stack = [], media, wide = false }: ProjectCardProps) {
  const shown = stack.slice(0, STACK_SHOWN);
  const rest = stack.length - shown.length;
  return (
    <>
      {media && (
        <span
          className={`border-rule block aspect-video shrink-0 overflow-hidden border-b-[length:var(--border)] ${
            wide ? "sm:w-1/2 sm:self-start sm:border-r-[length:var(--border)] sm:border-b-0" : ""
          }`}
        >
          {media}
        </span>
      )}
      <span className="flex flex-1 flex-col">
        <span className="flex flex-1 flex-col gap-2 px-5 pt-4 pb-5">
          <span className="text-soft text-meta flex flex-wrap items-center gap-x-3 gap-y-1 font-mono tabular-nums">
            {year}
            <Chip>{status}</Chip>
          </span>
          <span className="text-title font-semibold">
            <span className="hd">
              <span>{title}</span>
              <DrawnMark />
            </span>
          </span>
          <span className="line-clamp-3">{summary}</span>
        </span>
        {shown.length > 0 && (
          <span className="border-rule flex flex-wrap items-center gap-2 border-t-[length:var(--border)] px-5 py-3">
            {shown.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
            {rest > 0 && <span className="text-soft text-meta font-mono">+{rest}</span>}
          </span>
        )}
      </span>
    </>
  );
}
