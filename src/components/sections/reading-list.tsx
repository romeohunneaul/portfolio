import { EntryRow } from "@/components/ui/entry-row";
import { articles, type Article } from "@/data/reading";

type ReadingListProps = {
  items?: Article[];
  /** Home: first N, titles only. */
  limit?: number;
};

/** Title — author, and one sentence on why it stuck. */
export function ReadingList({ items = articles, limit }: ReadingListProps) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div>
      {list.map((a) => (
        <EntryRow
          key={a.url}
          href={a.url}
          title={
            <>
              <span className="font-semibold">{a.title}</span>
              <span> — {a.author}</span>
            </>
          }
          meta={a.year}
          detail={limit ? undefined : a.why}
        />
      ))}
    </div>
  );
}
