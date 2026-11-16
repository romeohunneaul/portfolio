import { AskCard } from "@/components/ask/ask-row";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/data/projects";
import { projectsBlock } from "@/data/sections";

/** One card per problem worked on. A card opens the side panel: problem, approach, stack, questions. */
export function ProjectsList({ limit }: { limit?: number }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
      {list.map((p) => (
        <li key={p.slug} id={p.slug} className="scroll-mt-8">
          <AskCard context={{ kind: "project", id: p.slug }}>
            <ProjectCard title={p.title} stack={p.stack} image={p.image} more={projectsBlock.more} />
          </AskCard>
          <noscript>
            <p className="m-0 max-w-[var(--measure)] py-4">{p.problem}</p>
          </noscript>
        </li>
      ))}
    </ul>
  );
}
