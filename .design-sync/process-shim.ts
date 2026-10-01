// next/link and next/image read process.env.__NEXT_* at load. The converter only defines NODE_ENV,
// so outside Next the bundle would throw before exporting anything. Evaluated first (see entry.ts).
const g = globalThis as { process?: { env: Record<string, string | undefined> } };
g.process ??= { env: { NODE_ENV: "production" } };
export {};
