import { allNotes } from "content-collections";
import { NoteCard } from "@/components/ui/note-card";
import { Reveal } from "@/components/ui/reveal";
import { Bio } from "@/components/sections/bio";
import { Margin } from "@/components/sections/margin";
import { PageTitle } from "@/components/sections/page-title";
import { ProjectsList } from "@/components/sections/projects-list";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { StackGrid } from "@/components/sections/stack-grid";
import { Timeline } from "@/components/sections/timeline";
import { RaceList, UtmbLine } from "@/components/sections/trail-section";
import { articles } from "@/data/reading";

export default function Home() {
  const notes = allNotes.filter((n) => !n.draft).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <main className="grid items-start gap-x-14 pt-10 lg:grid-cols-[1fr_var(--aside-width)]">
      <PageTitle>François Massanes — notebook</PageTitle>

      <div className="flex flex-col gap-[var(--space-11)]">
        <Reveal>
          <Bio />
        </Reveal>

        <Reveal delay={0.1}>
          <Section id="work" label="Work" more="/work">
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
            <p className="text-soft m-0 text-[length:var(--size-body)]">Nothing published yet. Soon.</p>
          )}
        </Section>

        <Section id="projects" label="Problems worked on" more="/work">
          <ProjectsList limit={4} />
        </Section>

        <Section id="stack" label="Tools actually used" more="/work#stack">
          <StackGrid />
        </Section>

        <Section id="trail" label="Trail" more="/trail">
          <div className="flex flex-col gap-3">
            <UtmbLine />
            <RaceList limit={3} />
          </div>
        </Section>

        <Section id="reading" label="Reading" aside={`${articles.length} that stuck`} more="/reading">
          <ReadingList limit={4} />
        </Section>
      </div>

      <Margin />
    </main>
  );
}
