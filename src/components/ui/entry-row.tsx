import Link from "next/link";
import type { ReactNode } from "react";

type EntryRowProps = {
  title: ReactNode;
  /** Right column: dates, counts. Several items render with a gap, no separators. */
  meta?: ReactNode;
  /** Chip or mark after the title. */
  mark?: ReactNode;
  /** Second line, measured. */
  detail?: ReactNode;
  href?: string;
};

const base =
  "grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-rule py-4 text-row";

/** A hairline row. Everything that is not a published note is one of these. */
export function EntryRow({ title, meta, mark, detail, href }: EntryRowProps) {
  const body = (
    <>
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span>{title}</span>
        {mark}
      </span>
      {meta && <span className="text-soft text-meta flex gap-3 font-mono tabular-nums">{meta}</span>}
      {detail && <span className="text-soft col-span-2 max-w-[var(--measure)]">{detail}</span>}
    </>
  );

  if (!href) return <div className={base}>{body}</div>;

  const cls = `${base} no-underline hover:bg-[var(--accent-tint)]`;
  return href.startsWith("http") ? (
    <a href={href} className={cls} rel="noreferrer">
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
