import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  turbopack: {
    // Sans cela, Next remonte jusqu'au home (un pnpm-lock.yaml y traîne)
    // et considère le dossier personnel comme racine du workspace.
    root: import.meta.dirname,
  },
  // /trail devient /outdoor (ski inclus) — l'ancienne URL a circulé.
  redirects: async () => [{ source: "/trail", destination: "/outdoor", permanent: true }],
  // PostHog through our own domain: ad blockers drop requests to *.posthog.com.
  rewrites: async () => [
    { source: "/ingest/static/:path*", destination: "https://eu-assets.i.posthog.com/static/:path*" },
    { source: "/ingest/array/:path*", destination: "https://eu-assets.i.posthog.com/array/:path*" },
    { source: "/ingest/:path*", destination: "https://eu.i.posthog.com/:path*" },
  ],
  // PostHog calls its API with trailing slashes; a redirect would break them.
  skipTrailingSlashRedirect: true,
};

export default withContentCollections(nextConfig);
