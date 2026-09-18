/**
 * "Ask" — what the visitor was looking at when they opened the panel, and the
 * questions that make sense from there. Shared by the client (panel) and the
 * server (instructions), so a context can never mean two different things.
 *
 * Questions are authored next to the data (`questions` on each experience and
 * project): a template like "What did he do at {company}" reads wrong as soon
 * as the company is "Independent".
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

const general = ["What does François do today?", "What has he shipped with AI?", "What kind of role is he looking for?"];

export function suggestions(context: AskContext): string[] {
  return resolve(context)?.data.questions ?? general;
}
