import { notFound } from "next/navigation";
import { TextLink } from "@/components/ui/text-link";
import { allNotes } from "content-collections";
import { MDXContent } from "@content-collections/mdx/react";
import { DeliveryPipeline } from "@/components/sections/delivery-pipeline";
import { Chip } from "@/components/ui/chip";

export function generateStaticParams() {
  return allNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: PageProps<"/sandbox/[slug]">) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);
  if (!note) return {};
  return { title: note.title, description: note.summary };
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function NotePage({ params }: PageProps<"/sandbox/[slug]">) {
  const { slug } = await params;
  const note = allNotes.find((n) => n.slug === slug);
  if (!note || note.draft) notFound();

  return (
    <main id="main" className="pt-12">
      <TextLink href="/#lab" className="text-meta">
        Back to the notebook
      </TextLink>

      <article className="mt-10 max-w-[var(--measure)]">
        <header className="flex flex-col gap-4">
          <h1 className="text-lede m-0 font-semibold text-balance">{note.title}</h1>
          <p className="text-soft text-meta m-0 flex flex-wrap items-center gap-3 font-mono">
            <time dateTime={note.date}>{longDate.format(new Date(note.date))}</time>
            {note.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </p>
        </header>

        <div className="prose mt-10 flex flex-col gap-5 [&_h2]:text-title [&_h2]:mt-6 [&_h2]:scroll-mt-8 [&_h2]:font-semibold">
          <MDXContent code={note.mdx} components={{ DeliveryPipeline }} />
        </div>
      </article>
    </main>
  );
}
