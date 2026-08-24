type NoteCardProps = {
  title: string;
  summary: string;
  tags?: string[];
};

export function NoteCard({ title, summary, tags = [] }: NoteCardProps) {
  return (
    <article className="rounded-lg border border-black/10 p-4 dark:border-white/15">
      <h3 className="font-medium">{title}</h3>
      <p className="mt-1 text-sm opacity-70">{summary}</p>
      {tags.length > 0 && (
        <ul className="mt-2 flex gap-2">
          {tags.map((tag) => (
            <li key={tag} className="text-xs opacity-50">
              #{tag}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
