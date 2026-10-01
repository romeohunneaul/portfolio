import { allNotes } from "content-collections";
import { NoteCard } from "@/components/ui/note-card";
import { Reveal } from "@/components/ui/reveal";
import { AskHero } from "@/components/ask/ask-hero";
import { Highlight } from "@/components/ui/highlight";
import { DrawnMark } from "@/components/ui/drawn-mark";
import { RidgeSketch } from "@/components/ui/ridge-sketch";
import { Listening } from "@/components/sections/listening";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { Timeline } from "@/components/sections/timeline";
import { RouteGrid } from "@/components/sections/trail-section";
import { askHome, ledes } from "@/data/sections";
import { loadRoutes } from "@/lib/routes";

/** Ask first: one broad question and the ask box fill the first screen, centred. The notebook
 *  (who, work, lab, outdoor, reading, listening) starts one scroll below at #cv. */
export default async function Home() {
  const notes = allNotes.filter((n) => !n.draft).sort((a, b) => b.date.localeCompare(a.date));
  const routes = await loadRoutes();
  const picks = [...routes.filter((r) => r.sport === "trail").slice(0, 2), ...routes.filter((r) => r.sport === "ski").slice(0, 2)];

  return (
    <main id="main" className="flex flex-col gap-[var(--space-section)]">
      {/* The first screen, three type roles only: the question (hero size), prose at body size
          (intro, the field), captions at meta size. The group sits in the middle of the screen;
          the way down is pinned to its bottom edge. */}
      <section
        aria-labelledby="ask-title-home"
        className="flex min-h-[calc(100svh-7rem)] flex-col items-start text-left sm:items-center sm:text-center"
      >
        <div className="flex w-full flex-col items-start pt-10 sm:my-auto sm:items-center sm:pt-0">
          <h1
            id="ask-title-home"
            className="m-0 text-[length:var(--size-hero)] leading-[var(--leading-hero)] font-semibold text-balance"
          >
            {askHome.title.before}
            <Highlight punch>{askHome.title.mark}</Highlight>
            {askHome.title.after}
          </h1>
          <p className="text-soft m-0 mt-5 max-w-[40em] text-[length:var(--size-hero-lede)] text-balance">{askHome.intro}</p>
          <div className="mt-10 flex w-full max-w-[var(--hero-measure)] justify-center sm:mt-14">
            <AskHero />
          </div>
          <p className="text-soft text-meta m-0 mt-4 max-w-[var(--hero-measure)] text-pretty">{askHome.helper}</p>
        </div>

        {/* The way down: the logo draws itself on the page's paper, a hint that a notebook follows. */}
        <a href="#cv" className="draws mt-12 flex flex-col items-start gap-2 pb-4 no-underline [--sketch-fill:var(--paper)] sm:items-center">
          {/* Phones keep the first screen to the box: the drawing waits for wider screens. */}
          <span className="max-sm:hidden">
            <RidgeSketch width={64} />
          </span>
          <span className="hd text-meta font-mono">
            <span>{askHome.classic} ↓</span>
            <DrawnMark />
          </span>
        </a>
      </section>

      <div id="cv" className="flex scroll-mt-8 flex-col gap-[var(--space-section)]">
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
    </main>
  );
}
