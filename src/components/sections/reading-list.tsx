import { EntryRow } from "@/components/ui/entry-row";
import { articles } from "@/data/reading";

/** Title — author, and one sentence on why it stuck. */
export function ReadingList({ limit }: { limit?: number }) {
  const list = limit ? articles.slice(0, limit) : articles;
  return (
    <div>
      {list.map((a) => (
        <EntryRow
          key={a.url}
          href={a.url}
          title={
            <>
              {a.title}
              <span className="text-soft"> — {a.author}</span>
            </>
          }
          meta={a.year}
          detail={limit ? undefined : a.why}
        />
      ))}
    </div>
  );
}
