import Link from "next/link";

type NoteCardProps = {
  title: string;
  summary: string;
  slug?: string;
  date?: string;
  tags?: string[];
};

export function NoteCard({ title, summary, slug, date, tags = [] }: NoteCardProps) {
  const heading = slug ? (
    <Link href={`/sandbox/${slug}`} className="underline-offset-4 hover:underline">
      {title}
    </Link>
  ) : (
    title
  );

  return (
    <article className="border-line border-t py-6">
      <h3 className="text-lg font-medium tracking-tight">{heading}</h3>
      <p className="text-muted mt-1 text-sm leading-relaxed">{summary}</p>
      {(date || tags.length > 0) && (
        <div className="text-muted mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
          {date && <time dateTime={date}>{date}</time>}
          {tags.length > 0 && (
            <ul className="flex gap-2">
              {tags.map((tag) => (
                <li key={tag}>#{tag}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
