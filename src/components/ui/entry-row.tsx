import Link from "next/link";
import type { ReactNode } from "react";

type EntryRowProps = {
  title: ReactNode;
  meta?: ReactNode;
  /** Small mark or chip after the title. */
  mark?: ReactNode;
  /** Second line, soft. */
  detail?: ReactNode;
  href?: string;
};

const base =
  "grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-rule px-2 py-[13px] text-[length:var(--size-row)]";

/** A hairline row. Everything that is not a published note is one of these. */
export function EntryRow({ title, meta, mark, detail, href }: EntryRowProps) {
  const body = (
    <>
      <span className="flex flex-wrap items-center gap-3">
        <span>{title}</span>
        {mark}
      </span>
      {meta && <span className="text-soft font-mono text-[length:var(--size-meta)] tabular-nums">{meta}</span>}
      {detail && <span className="text-soft col-span-2 text-[length:var(--size-body)]">{detail}</span>}
    </>
  );

  if (!href) return <div className={base}>{body}</div>;

  const external = href.startsWith("http");
  const cls = `${base} no-underline hover:bg-[var(--accent-tint)]`;
  return external ? (
    <a href={href} className={cls} rel="noreferrer">
      {body}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {body}
    </Link>
  );
}
