import { allNotes } from "content-collections";
import { NoteCard } from "@/components/ui/note-card";
import { Reveal } from "@/components/ui/reveal";
import { Bio } from "@/components/sections/bio";
import { Margin } from "@/components/sections/margin";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { Timeline } from "@/components/sections/timeline";
import { RaceList, UtmbLine } from "@/components/sections/trail-section";

/** Four blocks: who, work, lab, on the side. Details live in the tabs. */
export default function Home() {
  const notes = allNotes.filter((n) => !n.draft).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main id="main" className="grid items-start gap-x-14 pt-12 lg:grid-cols-[1fr_var(--aside-width)]">
      <div className="flex flex-col gap-16">
        <Reveal>
          <Bio />
        </Reveal>

        <Reveal delay={0.1}>
          <Section id="work" label="Work" aside="Career, projects, tools" more="/work">
            <Timeline />
          </Section>
        </Reveal>

        <Section id="lab" label="Lab" aside={`${notes.length} ${notes.length === 1 ? "note" : "notes"}`}>
          {notes.length > 0 ? (
            <div className="flex flex-col gap-4">
              {notes.map((n) => (
                <NoteCard key={n.slug} title={n.title} summary={n.summary} slug={n.slug} date={n.date} tags={n.tags} />
              ))}
            </div>
          ) : (
            <p className="text-soft m-0">Nothing published yet.</p>
          )}
        </Section>

        <Section id="trail" label="Trail" aside="Races and routes" more="/trail">
          <div className="flex flex-col gap-6">
            <UtmbLine />
            <RaceList limit={3} />
          </div>
        </Section>

        <Section id="reading" label="Reading" aside="All articles" more="/reading">
          <ReadingList limit={4} />
        </Section>
      </div>

      <Margin />
    </main>
  );
}
