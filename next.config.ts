import type { NextConfig } from "next";
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  turbopack: {
    // Sans cela, Next remonte jusqu'au home (un pnpm-lock.yaml y traîne)
    // et considère le dossier personnel comme racine du workspace.
    root: import.meta.dirname,
  },
};

export default withContentCollections(nextConfig);
