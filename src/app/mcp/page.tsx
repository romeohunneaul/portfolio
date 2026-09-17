import type { Metadata } from "next";
import { EntryRow } from "@/components/ui/entry-row";
import { PageTitle } from "@/components/sections/page-title";
import { Section } from "@/components/sections/section";
import { profile } from "@/data/profile";
import { mcpTools } from "@/lib/mcp-tools";

export const metadata: Metadata = { title: "MCP", description: "Add this profile to Claude, ChatGPT or Cursor." };

const url = `${profile.links.site}/api/mcp`;

const Code = ({ children }: { children: string }) => (
  <pre className="bg-card border-rule m-0 overflow-x-auto border-[length:var(--border)] px-4 py-3 font-mono text-[length:var(--size-meta)] leading-[var(--leading-loose)]">
    {children}
  </pre>
);

export default function McpPage() {
  return (
    <main className="flex flex-col gap-[var(--space-11)] pt-10">
      <PageTitle>MCP server</PageTitle>

      <p className="m-0 max-w-[var(--measure)] text-[length:var(--size-lede)]">
        This site is also an MCP server. Add it to Claude, ChatGPT or Cursor and ask about me instead of reading.
      </p>

      <Section id="connect" label="Connect" aside="streamable http, no auth">
        <div className="flex flex-col gap-4 text-[length:var(--size-body)]">
          <p className="m-0">
            <strong className="font-medium">Claude</strong> — Settings → Connectors → Add custom connector → paste the URL.{" "}
            <strong className="font-medium">ChatGPT</strong> — Settings → Apps & connectors → Create (developer mode) → paste the URL.
          </p>
          <Code>{url}</Code>
          <p className="m-0">
            <strong className="font-medium">Cursor / Claude Code / any stdio client</strong>
          </p>
          <Code>{`{
  "mcpServers": {
    "francois": { "url": "${url}" }
  }
}`}</Code>
          <p className="m-0">Or from a terminal, without any client:</p>
          <Code>{`curl -s ${url} \\
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</Code>
        </div>
      </Section>

      <Section id="try" label="Try asking">
        <ul className="text-soft m-0 flex list-none flex-col gap-1 p-0 text-[length:var(--size-body)]">
          <li>“What has François shipped with the Vercel AI SDK?”</li>
          <li>“Is he a fit for a head of product role on an industrial SaaS?”</li>
          <li>“Which trail should I run near Annecy?”</li>
        </ul>
      </Section>

      <Section id="tools" label="Tools" aside={`${mcpTools.length} · read-only`}>
        <div>
          {mcpTools.map((t) => (
            <EntryRow
              key={t.name}
              title={<code className="font-mono text-[length:var(--size-meta)]">{t.name}</code>}
              meta={"args" in t ? t.args : "—"}
              detail={t.description}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
