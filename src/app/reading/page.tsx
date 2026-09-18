import type { Metadata } from "next";
import { PageHeading } from "@/components/sections/page-heading";
import { ReadingList } from "@/components/sections/reading-list";
import { Section } from "@/components/sections/section";
import { articles, readingIntro } from "@/data/reading";

export const metadata: Metadata = { title: "Reading", description: readingIntro };

export default function ReadingPage() {
  const books = articles.filter((a) => a.kind === "book");
  const posts = articles.filter((a) => a.kind === "article");
  return (
    <main id="main" className="flex flex-col gap-16 pt-12">
      <PageHeading lede={readingIntro}>Reading</PageHeading>
      <Section id="books" label="Books" aside={`${books.length}`}>
        <ReadingList items={books} />
      </Section>
      <Section id="articles" label="Articles" aside={`${posts.length}`}>
        <ReadingList items={posts} />
      </Section>
    </main>
  );
}
