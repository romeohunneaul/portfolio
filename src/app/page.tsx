import { allNotes } from "content-collections";
import { NoteCard } from "@/components/note-card";
import { Reveal } from "@/components/reveal";

export default function Home() {
  const notes = allNotes
    .filter((note) => !note.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-24 sm:px-8 sm:py-32">
      <Reveal>
        <header>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            François Massanes
          </h1>
          <p className="text-muted mt-4 text-base leading-relaxed sm:text-lg">
            Je construis des produits où l&apos;IA résout des problèmes concrets
            et crée de nouvelles formes d&apos;interaction au travail.
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.15}>
        <section className="mt-20" aria-labelledby="sandbox">
          <h2
            id="sandbox"
            className="text-muted font-mono text-xs uppercase tracking-widest"
          >
            Sandbox
          </h2>
          <div className="mt-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard
                  key={note.slug}
                  title={note.title}
                  summary={note.summary}
                  slug={note.slug}
                  date={note.date}
                  tags={note.tags}
                />
              ))
            ) : (
              <p className="text-muted border-line border-t py-6 text-sm">
                Aucune note publiée pour le moment.
              </p>
            )}
          </div>
        </section>
      </Reveal>
    </main>
  );
}
