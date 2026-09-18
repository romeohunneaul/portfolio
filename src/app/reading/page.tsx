import type { Metadata } from "next";
import { PageHeading } from "@/components/sections/page-heading";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { articles } from "@/data/reading";

export const metadata: Metadata = { title: "Reading", description: "Articles that stuck, and why." };

export default function ReadingPage() {
  return (
    <main id="main" className="flex flex-col gap-16 pt-12">
      <PageHeading lede="Articles that changed how I work. One line each on why.">Reading</PageHeading>
      <Section id="articles" label="Articles that stuck" aside={`${articles.length} so far`}>
        <ReadingList />
      </Section>
    </main>
  );
}
