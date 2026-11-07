import posthog from "posthog-js";

// Visits → PostHog, without cookies or storage, so no consent banner. Cookieless mode must also be on in
// the PostHog project settings, or these events are dropped. Requests go through /ingest (next.config.ts).
const token = process.env.NEXT_PUBLIC_POSTHOG_TOKEN;
if (token) {
  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-08-30",
    cookieless_mode: "always",
  });
}
