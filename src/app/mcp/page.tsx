import type { Metadata } from "next";
import { EntryRow } from "@/components/ui/entry-row";
import { PageHeading } from "@/components/sections/page-heading";
import { Section } from "@/components/sections/section";
import { profile } from "@/data/profile";
import { mcpTools } from "@/lib/mcp-tools";

export const metadata: Metadata = { title: "MCP", description: "Add this profile to Claude, ChatGPT or Cursor." };

const url = `${profile.links.site}/api/mcp`;

const Code = ({ children }: { children: string }) => (
  <pre className="bg-card border-rule text-meta m-0 overflow-x-auto border-[length:var(--border)] px-4 py-3 font-mono" translate="no">
    <code>{children}</code>
  </pre>
);

export default function McpPage() {
  return (
    <main id="main" className="flex flex-col gap-16 pt-12">
      <PageHeading lede="This site is also an MCP server. Add it to Claude, ChatGPT or Cursor and ask about me instead of reading.">
        MCP server
      </PageHeading>

      <Section id="connect" label="Connect" aside="Streamable HTTP, no auth">
        <div className="flex max-w-[var(--measure)] flex-col gap-4">
          <p className="m-0">
            <strong className="font-semibold">Claude</strong> — Settings, Connectors, Add custom connector, paste the URL.
            <br />
            <strong className="font-semibold">ChatGPT</strong> — Settings, Apps and connectors, Create (developer mode), paste the URL.
          </p>
          <Code>{url}</Code>
          <p className="m-0">
            <strong className="font-semibold">Cursor, Claude Code, any stdio client</strong>
          </p>
          <Code>{`{
  "mcpServers": {
    "francois": { "url": "${url}" }
  }
}`}</Code>
          <p className="m-0">From a terminal, without any client:</p>
          <Code>{`curl -s ${url} \\
  -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'`}</Code>
        </div>
      </Section>

      <Section id="try" label="Try asking">
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          <li>“What has François shipped with the Vercel AI SDK?”</li>
          <li>“Is he a fit for a head of product role on an industrial SaaS?”</li>
          <li>“Which trail should I run near Annecy?”</li>
        </ul>
      </Section>

      <Section id="tools" label="Tools" aside={`${mcpTools.length}, read-only`}>
        <div>
          {mcpTools.map((t) => (
            <EntryRow
              key={t.name}
              title={<code className="font-mono">{t.name}</code>}
              meta={"args" in t ? t.args : "no args"}
              detail={t.description}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
