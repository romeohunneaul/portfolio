import { notFound } from "next/navigation";
import Link from "next/link";
import { allNotes } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { Chip } from "@/components/ui/chip";

export function generateStaticParams() {
  return allNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sandbox/[slug]">) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);
  if (!note) return {};
  return { title: note.title, description: note.summary };
}

export default async function NotePage({ params }: PageProps<"/sandbox/[slug]">) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);
  if (!note || note.draft) notFound();

  return (
    <main className="pt-10">
      <Link href="/#lab" className="text-soft font-mono text-[length:var(--size-meta)]">
        ← notebook
      </Link>

      <article className="mt-8 max-w-[var(--measure)]">
        <header className="flex flex-col gap-3">
          <h1 className="m-0 text-[length:var(--size-lede)] font-medium leading-[var(--leading-tight)]">{note.title}</h1>
          <p className="text-soft m-0 flex flex-wrap items-center gap-3 font-mono text-[length:var(--size-meta)]">
            <time dateTime={note.date}>{note.date}</time>
            {note.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-5 text-[length:var(--size-body)] leading-[var(--leading-body)] [&_a]:underline [&_h2]:mt-4 [&_h2]:text-[length:var(--size-entry)] [&_h2]:font-medium">
          <MDXContent code={note.mdx} />
        </div>
      </article>
    </main>
  );
}
