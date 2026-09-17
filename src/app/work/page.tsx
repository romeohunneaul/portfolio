import type { Metadata } from "next";
import { PageTitle } from "@/components/sections/page-title";
import { ProjectsList } from "@/components/sections/projects-list";
import { Section } from "@/components/sections/section";
import { StackGrid } from "@/components/sections/stack-grid";
import { Timeline } from "@/components/sections/timeline";
import { profile } from "@/data/profile";

export const metadata: Metadata = { title: "Work", description: "Career, problems worked on, tools actually used." };

export default function WorkPage() {
  return (
    <main className="flex flex-col gap-[var(--space-11)] pt-10">
      <PageTitle>Work</PageTitle>

      <Section
        id="career"
        label="Career"
        aside={
          <a href={profile.links.linkedin} rel="noreferrer" className="no-underline hover:underline">
            linkedin ↗
          </a>
        }
      >
        <Timeline variant="full" />
      </Section>

      <Section id="problems" label="Problems worked on" aside="click to unfold">
        <ProjectsList variant="full" />
      </Section>

      <Section id="stack" label="Skills & tools" aside="hover a tool for where it was used">
        <StackGrid withSkills />
      </Section>

      <Section
        id="code"
        label="Code"
        aside={
          <a href={profile.links.github} rel="noreferrer" className="no-underline hover:underline">
            github ↗
          </a>
        }
      >
        <p className="text-soft m-0 max-w-[var(--measure)] text-[length:var(--size-body)]">
          Client repositories stay private. Public: this site, and a Garmin MCP server. The rest shows up as lab notes.
        </p>
      </Section>
    </main>
  );
}
