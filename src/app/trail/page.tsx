import type { Metadata } from "next";
import { PageTitle } from "@/components/sections/page-title";
import { Section } from "@/components/sections/section";
import { RaceList, RouteGrid, UtmbLine } from "@/components/sections/trail-section";
import { utmb } from "@/data/trail";
import { loadRoutes } from "@/lib/routes";

export const metadata: Metadata = { title: "Trail", description: "Races, and the routes worth sending people to." };

export default async function TrailPage() {
  const routes = await loadRoutes();
  return (
    <main className="flex flex-col gap-[var(--space-11)] pt-10">
      <PageTitle>Trail</PageTitle>

      <Section id="index" label="Where I stand" aside={`updated ${utmb.updated}`}>
        <div className="flex flex-col gap-3">
          <UtmbLine />
          <dl className="m-0 grid grid-cols-2 gap-x-6 gap-y-1 font-mono text-[length:var(--size-meta)] sm:grid-cols-4">
            {[
              ["20K", utmb.index20k],
              ["50K", utmb.index50k],
              ["100K", utmb.index100k],
              ["category", utmb.category],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline gap-2">
                <dt className="text-soft">{k}</dt>
                <dd className="m-0">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="routes" label="Routes worth the drive" aside={`${routes.length} gpx`}>
        <RouteGrid routes={routes} />
      </Section>

      <Section id="races" label="Races" aside="time · rank · year">
        <RaceList />
      </Section>
    </main>
  );
}
