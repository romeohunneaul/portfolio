import type { Metadata } from "next";
import { PageHeading } from "@/components/sections/page-heading";
import { Section } from "@/components/sections/section";
import { ElsewhereLine, RouteGrid } from "@/components/sections/trail-section";
import { loadRoutes } from "@/lib/routes";

export const metadata: Metadata = { title: "Outdoor", description: "Trail and ski routes worth the drive, as GPX files you can take." };

export default async function OutdoorPage() {
  const routes = await loadRoutes();
  const trail = routes.filter((r) => r.sport === "trail");
  const ski = routes.filter((r) => r.sport === "ski");

  return (
    <main id="main" className="flex flex-col gap-16 pt-12">
      <PageHeading lede="Routes I would send a friend on. Each one is a GPX you can take; photos follow when I sort them.">Outdoor</PageHeading>

      <Section id="trail" label="Trail" aside={`${trail.length} routes`}>
        <RouteGrid routes={trail} />
      </Section>

      <Section id="ski" label="Ski touring" aside={ski.length ? `${ski.length} tours` : "Traces coming"}>
        {ski.length > 0 ? (
          <RouteGrid routes={ski} />
        ) : (
          <p className="text-soft m-0 max-w-[var(--measure)]">
            Chamonix, Beaufort and La Léchère from last winter — traces on their way from the watch.
          </p>
        )}
      </Section>

      <ElsewhereLine />
    </main>
  );
}
