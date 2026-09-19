import type { Metadata } from "next";
import { PageHeading } from "@/components/sections/page-heading";
import { ProjectsList } from "@/components/sections/projects-list";
import { Section } from "@/components/sections/section";
import { StackGrid } from "@/components/sections/stack-grid";
import { Timeline } from "@/components/sections/timeline";
import { profile } from "@/data/profile";
import { TextLink } from "@/components/ui/text-link";
import { ledes } from "@/data/sections";

export const metadata: Metadata = { title: "Work", description: "Career, problems worked on, tools actually used." };

export default function WorkPage() {
  return (
    <main id="main" className="flex flex-col gap-16 pt-12">
      <PageHeading lede={ledes.work}>Work</PageHeading>

      <Section
        id="career"
        label="Career"
        aside={<TextLink href={profile.links.linkedin}>LinkedIn</TextLink>}
      >
        <Timeline variant="full" />
      </Section>

      <Section id="problems" label="Problems worked on" lede="Told by the problem. Clients stay backstage.">
        <ProjectsList />
      </Section>

      <Section id="stack" label="Skills and tools">
        <StackGrid withSkills />
      </Section>

      <Section
        id="code"
        label="Code"
        aside={<TextLink href={profile.links.github}>GitHub</TextLink>}
      >
        <p className="m-0 max-w-[var(--measure)]">
          Client repositories stay private. Public: this site, and a Garmin MCP server. The rest shows up as lab notes.
        </p>
      </Section>
    </main>
  );
}
