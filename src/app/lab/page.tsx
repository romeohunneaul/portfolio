import type { Metadata } from "next";
import Link from "next/link";
import { PROTOS } from "@/lab/manifest";

// Lab is a workshop, not part of the site: keep it out of search.
export const metadata: Metadata = { title: "Lab", robots: { index: false, follow: false } };

export default function LabDashboard() {
  return (
    <main className="py-8">
      <h1 className="text-title mb-1">Lab</h1>
      <p className="text-meta mb-8 text-neutral-500">Prototypes built on the site&apos;s real components. Not shipped.</p>
      <ul className="grid gap-3">
        {PROTOS.map((p) => (
          <li key={p.slug}>
            <Link href={`/lab/p/${p.slug}`} className="draws border-rule block rounded-lg border p-4 hover:bg-black/[0.02]">
              <div className="mb-1 flex items-baseline justify-between gap-3">
                <span className="font-semibold">{p.name}</span>
                <span className="text-meta font-mono text-neutral-400">{p.slug}</span>
              </div>
              <p className="text-meta text-neutral-600">{p.description}</p>
              <p className="text-meta mt-1 text-neutral-400">
                {p.author}
                {p.axes?.length ? ` · ${p.axes.length} axes` : ""}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
