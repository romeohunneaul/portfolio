import { allNotes } from "content-collections";
import { NoteCard } from "@/components/ui/note-card";
import { Reveal } from "@/components/ui/reveal";
import { Bio } from "@/components/sections/bio";
import { Listening } from "@/components/sections/listening";
import { Margin } from "@/components/sections/margin";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { Timeline } from "@/components/sections/timeline";
import { RouteGrid } from "@/components/sections/trail-section";
import { ledes } from "@/data/sections";
import { loadRoutes } from "@/lib/routes";

/** Who, work, lab, outdoor, reading, listening. Each block opens onto its tab. */
export default async function Home() {
  const notes = allNotes.filter((n) => !n.draft).sort((a, b) => b.date.localeCompare(a.date));
  const routes = await loadRoutes();
  const picks = [...routes.filter((r) => r.sport === "trail").slice(0, 2), ...routes.filter((r) => r.sport === "ski").slice(0, 2)];

  return (
    <main id="main" className="grid items-start gap-x-14 pt-12 lg:grid-cols-[1fr_var(--aside-width)]">
      <div className="flex flex-col gap-16">
        <Reveal>
          <Bio />
        </Reveal>

        <Reveal delay={0.1}>
          <Section id="work" label="Work" lede={ledes.work} aside="Career, projects, tools" more="/work">
            <Timeline limit={3} />
          </Section>
        </Reveal>

        <Section id="lab" label="Lab" lede={ledes.lab} aside={`${notes.length} ${notes.length === 1 ? "note" : "notes"}`}>
          {notes.length > 0 ? (
            <div className="flex flex-col gap-4">
              {notes.slice(0, 3).map((n) => (
                <NoteCard key={n.slug} title={n.title} summary={n.summary} slug={n.slug} date={n.date} tags={n.tags} />
              ))}
            </div>
          ) : (
            <p className="text-soft m-0">Nothing published yet.</p>
          )}
        </Section>

        <Section id="outdoor" label="Outdoor" lede={ledes.outdoor} aside="All routes, ski included" more="/outdoor">
          <RouteGrid routes={picks} />
        </Section>

        <Section id="reading" label="Reading" lede={ledes.reading} aside="Books and articles" more="/reading">
          <ReadingList limit={4} />
        </Section>

        <Section id="listening" label="Listening" lede={ledes.listening} aside="Spotify">
          <Listening />
        </Section>
      </div>

      <Margin />
    </main>
  );
}
