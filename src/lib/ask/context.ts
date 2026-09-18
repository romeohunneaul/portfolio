/**
 * "Ask" — what the visitor was looking at when they opened the dialog, and the
 * three questions that make sense from there. Shared by the client (chips) and
 * the server (instructions), so a context can never mean two different things.
 */
import { experience } from "@/data/profile";
import { projects } from "@/data/projects";

export type AskContext = { kind: "experience" | "project"; id: string } | null;

/** Stable id for an experience row: company + start year. */
export const experienceId = (x: { company: string; start: string }) =>
  `${x.company}-${x.start}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export function resolve(context: AskContext) {
  if (!context) return null;
  if (context.kind === "experience") {
    const x = experience.find((e) => experienceId(e) === context.id);
    return x ? { kind: "experience" as const, label: `${x.company}, ${x.role}`, data: x } : null;
  }
  const p = projects.find((e) => e.slug === context.id);
  return p ? { kind: "project" as const, label: p.title, data: p } : null;
}

export function suggestions(context: AskContext): string[] {
  const r = resolve(context);
  if (r?.kind === "experience") {
    return [
      `What did François actually do at ${r.data.company}?`,
      `What was the impact at ${r.data.company}?`,
      `What did he learn there that he still uses?`,
    ];
  }
  if (r?.kind === "project") {
    return [`Which technologies were used on this project?`, `What was the hard part?`, `What is the status today?`];
  }
  return [`What does François do today?`, `What has he shipped with AI?`, `What kind of role is he looking for?`];
}
