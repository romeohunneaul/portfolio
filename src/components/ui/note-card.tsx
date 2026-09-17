import Link from "next/link";
import { Chip } from "./chip";

type NoteCardProps = {
  title: string;
  summary?: string;
  slug?: string;
  date?: string;
  tags?: string[];
};

/** Only published notes get to be cards. Hover: a hard offset shadow, nothing else. */
export function NoteCard({ title, summary, slug, date, tags = [] }: NoteCardProps) {
  const inner = (
    <>
      <span className="grid grid-cols-[1fr_auto] items-baseline gap-5">
        <span className="text-[length:var(--size-entry)] font-medium">{title}</span>
        {date && (
          <time dateTime={date} className="text-soft font-mono text-[length:var(--size-meta)] tabular-nums">
            {date.slice(0, 7).split("-").reverse().join(".")}
          </time>
        )}
      </span>
      {summary && <span className="text-soft block text-[length:var(--size-body)]">{summary}</span>}
      {tags.length > 0 && (
        <span className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </span>
      )}
    </>
  );

  const cls =
    "bg-card border-rule flex flex-col gap-2 border-[length:var(--border)] px-5 py-4 no-underline transition-shadow duration-150 hover:shadow-[var(--shadow-hover)]";

  return (
    <article>
      {slug ? (
        <Link href={`/sandbox/${slug}`} className={cls}>
          {inner}
        </Link>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </article>
  );
}
