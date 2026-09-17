import type { Metadata } from "next";
import { PageTitle } from "@/components/sections/page-title";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { articles } from "@/data/reading";

export const metadata: Metadata = { title: "Reading", description: "Articles that stuck, and why." };

export default function ReadingPage() {
  return (
    <main className="flex flex-col gap-[var(--space-11)] pt-10">
      <PageTitle>Reading</PageTitle>
      <Section id="articles" label="Articles that stuck" aside={`${articles.length}, one line each`}>
        <ReadingList />
      </Section>
    </main>
  );
}
