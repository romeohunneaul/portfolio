import { after } from "next/server";
import { convertToModelMessages, createUIMessageStreamResponse, streamText, tool, toUIMessageStream, type UIMessage } from "ai";
import { z } from "zod";
import { sendAlert, type Alert } from "@/lib/ask/alert";
import { buildInstructions } from "@/lib/ask/instructions";
import { askTelemetry, flushTraces } from "@/lib/ask/telemetry";

const MODEL = "anthropic/claude-haiku-4.5";
const MAX_MESSAGES = 16;
const MAX_CHARS = 600;

const Body = z.object({
  id: z.string().max(100).optional(), // useChat's conversation id
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
  // On Vercel the OIDC token arrives per request (x-vercel-oidc-token header), not as an env var at runtime.
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN && !req.headers.get("x-vercel-oidc-token")) {
    return Response.json({ error: "The assistant is not configured." }, { status: 503 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return Response.json({ error: "Too many questions. Try again in a few minutes." }, { status: 429 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Bad request." }, { status: 400 });

  const { id, messages, context } = parsed.data;
  const last = messages.at(-1)!;
  const question = textOf(last);
  if (last.role !== "user" || question.length > MAX_CHARS) {
    return Response.json({ error: `Keep questions under ${MAX_CHARS} characters.` }, { status: 400 });
  }

  // Settled by whichever of onEnd / onError / onAbort fires, so the alert never waits on a stream that died.
  let settle: (end: Pick<Alert, "answer" | "contact">) => void;
  const ended = new Promise<Pick<Alert, "answer" | "contact">>((resolve) => (settle = resolve));
  after(async () => {
    const end = await ended;
    const turn = messages.filter((m) => m.role === "user").length;
    await Promise.allSettled([flushTraces(), sendAlert({ question, context, turn, ...end })]);
  });

  const result = streamText({
    model: MODEL,
    instructions: buildInstructions(context),
    messages: await convertToModelMessages(messages),
    maxOutputTokens: 500,
    runtimeContext: { conversation: id ?? crypto.randomUUID() },
    telemetry: { functionId: "ask", integrations: askTelemetry, includeRuntimeContext: { conversation: true } },
    onEnd: ({ text, toolCalls }) => {
      const contact = toolCalls.find((c) => c.toolName === "contact");
      settle({ answer: text || undefined, contact: contact ? String((contact.input as { reason?: unknown }).reason ?? "") : undefined });
    },
    onError: () => settle({}),
    onAbort: () => settle({}),
    tools: {
      // No `execute`: the client renders the contact card when this part shows up.
      contact: tool({
        description: "Show the visitor how to reach François directly. Call it when the data does not answer the question, or when a need the visitor described fits his work.",
        inputSchema: z.object({ reason: z.string().describe("One short sentence: what the visitor wanted to know.") }),
      }),
    },
  });

  return createUIMessageStreamResponse({ stream: toUIMessageStream({ stream: result.stream }) });
}
