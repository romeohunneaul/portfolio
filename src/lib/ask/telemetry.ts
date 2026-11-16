import "server-only";
import { OpenTelemetry } from "@ai-sdk/otel";
import { BasicTracerProvider } from "@opentelemetry/sdk-trace-base";
import { PostHogSpanProcessor } from "@posthog/ai/otel";

/* Ask traces → PostHog AI observability (questions, answers, tokens, cost). A blank token makes the processor a no-op. */
const processor = new PostHogSpanProcessor({
  projectToken: process.env.NEXT_PUBLIC_POSTHOG_TOKEN ?? "",
  host: "https://eu.i.posthog.com",
});

/** Per-call integration for streamText: its own tracer, no global OpenTelemetry setup. */
export const askTelemetry = new OpenTelemetry({
  tracer: new BasicTracerProvider({ spanProcessors: [processor] }).getTracer("ask"),
  // One conversation = one PostHog session. Visits are cookieless, so there is no visitor id to join on.
  enrichSpan: ({ runtimeContext }) => {
    const id = runtimeContext?.conversation;
    return typeof id === "string" ? { "posthog.distinct_id": id, $ai_session_id: id } : undefined;
  },
});

/** The instance may freeze once the response is sent: push the spans out before that. */
export const flushTraces = () => processor.forceFlush();
