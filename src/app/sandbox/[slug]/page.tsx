import { notFound } from "next/navigation";
import Link from "next/link";
import { allNotes } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";

export function generateStaticParams() {
  return allNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sandbox/[slug]">) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);

  if (!note) return {};

  return { title: `${note.title} — François Massanes`, description: note.summary };
}

export default async function NotePage({ params }: PageProps<"/sandbox/[slug]">) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);

  if (!note || note.draft) notFound();

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24 sm:px-8 sm:py-32">
      <Link
        href="/"
        className="text-muted font-mono text-xs underline-offset-4 hover:underline"
      >
        ← retour
      </Link>

      <article className="mt-10">
        <header>
          <h1 className="text-3xl font-semibold tracking-tight">{note.title}</h1>
          <time
            dateTime={note.date}
            className="text-muted mt-3 block font-mono text-xs"
          >
            {note.date}
          </time>
        </header>

        <div className="mt-10 flex flex-col gap-5 leading-relaxed">
          <MDXContent code={note.mdx} />
        </div>
      </article>
    </main>
  );
}
