import type { Metadata } from "next";
import { PageHeading } from "@/components/sections/page-heading";
import { Section } from "@/components/sections/section";
import { RaceList, RouteGrid, UtmbLine } from "@/components/sections/trail-section";
import { utmb } from "@/data/trail";
import { loadRoutes } from "@/lib/routes";

export const metadata: Metadata = { title: "Trail", description: "Races, and the routes worth sending people to." };

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });

export default async function TrailPage() {
  const routes = await loadRoutes();
  return (
    <main id="main" className="flex flex-col gap-16 pt-12">
      <PageHeading lede="Up hills, slowly. Races from the UTMB index, routes as GPX files you can take.">Trail</PageHeading>

      <Section id="index" label="Where I stand" aside={`Updated ${monthYear.format(new Date(`${utmb.updated}-01`))}`}>
        <div className="flex flex-col gap-6">
          <UtmbLine />
          <dl className="m-0 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
            {[
              ["20K index", utmb.index20k],
              ["50K index", utmb.index50k],
              ["100K index", utmb.index100k],
              ["Category", utmb.category],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col">
                <dt className="text-soft text-meta">{k}</dt>
                <dd className="m-0 font-mono tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="routes" label="Routes worth the drive" aside={`${routes.length} GPX files`}>
        <RouteGrid routes={routes} />
      </Section>

      <Section id="races" label="Races" aside="Time, rank, year">
        <RaceList />
      </Section>
    </main>
  );
}
