import { convertToModelMessages, createUIMessageStreamResponse, streamText, tool, toUIMessageStream, type UIMessage } from "ai";
import { z } from "zod";
import { buildInstructions } from "@/lib/ask/instructions";

const MODEL = "anthropic/claude-haiku-4.5";
const MAX_MESSAGES = 16;
const MAX_CHARS = 600;

const Body = z.object({
  messages: z.array(z.custom<UIMessage>((m) => typeof m === "object" && m !== null)).min(1).max(MAX_MESSAGES),
  context: z.object({ kind: z.enum(["experience", "project"]), id: z.string().max(80) }).nullable().default(null),
});

/* Per-instance sliding window. Enough to stop a loop; real abuse protection is the platform firewall. */
const hits = new Map<string, number[]>();
function limited(ip: string, max = 20, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > max;
}

const textOf = (m: UIMessage) => m.parts.map((p) => (p.type === "text" ? p.text : "")).join("");

export async function POST(req: Request) {
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return Response.json({ error: "The assistant is not configured." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return Response.json({ error: "Too many questions. Try again in a few minutes." }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Bad request." }, { status: 400 });

  const { messages, context } = parsed.data;
  const last = messages.at(-1)!;
  if (last.role !== "user" || textOf(last).length > MAX_CHARS) {
    return Response.json({ error: `Keep questions under ${MAX_CHARS} characters.` }, { status: 400 });
  }

  const result = streamText({
    model: MODEL,
    instructions: buildInstructions(context),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
    tools: {
      // No `execute`: the client renders the contact card when this part shows up.
      contact: tool({
        description: "Show the visitor how to reach François directly. Call it when the data does not answer the question.",
        inputSchema: z.object({ reason: z.string().describe("One short sentence: what the visitor wanted to know.") }),
      }),
    },
  });

  return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) });
}
