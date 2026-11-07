import { AskCard } from "@/components/ask/ask-row";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { ProjectPreview } from "./project-preview";

/** One card per problem worked on. A card opens the side panel: problem, approach, stack, questions. */
export function ProjectsList({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2">
      {list.map((p) => (
        // A project with a film leads, across the whole width.
        <li key={p.slug} id={p.slug} className={`scroll-mt-8 ${p.video ? "sm:col-span-2" : ""}`}>
          <AskCard context={{ kind: "project", id: p.slug }} wide={!!p.video}>
            <ProjectCard
              title={p.title}
              year={p.year}
              status={p.status}
              summary={p.context}
              stack={p.stack}
              media={p.video && <ProjectPreview src={p.video.preview} poster={p.video.poster} />}
              wide={!!p.video}
            />
          </AskCard>
          <noscript>
            <p className="m-0 max-w-[var(--measure)] py-4">{p.problem}</p>
          </noscript>
        </li>
      ))}
    </ul>
  );
}
