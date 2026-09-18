import Link from "next/link";
import { Chip } from "./chip";

type NoteCardProps = {
  title: string;
  summary?: string;
  slug?: string;
  date?: string;
  tags?: string[];
};

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

/** Only published notes get to be cards. Hover: a hard offset shadow, nothing else. */
export function NoteCard({ title, summary, slug, date, tags = [] }: NoteCardProps) {
  const inner = (
    <>
      <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="text-title font-semibold">{title}</span>
        {date && (
          <time dateTime={date} className="text-soft text-meta font-mono">
            {monthYear.format(new Date(date))}
          </time>
        )}
      </span>
      {summary && <span className="block max-w-[var(--measure)]">{summary}</span>}
      {tags.length > 0 && (
        <span className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </span>
      )}
    </>
  );

  const cls =
    "bg-card border-rule flex flex-col gap-2 border-[length:var(--border)] px-6 py-5 no-underline transition-shadow duration-150 hover:shadow-[var(--shadow-hover)]";

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
