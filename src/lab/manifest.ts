import type { ComponentType } from "react";
import type { Axis } from "./variants";

/** One prototype. `load` is a dynamic import so a proto ships only when its page is opened. */
export type Proto = {
  slug: string;
  name: string;
  author: string;
  description: string;
  axes?: Axis[];
  load: () => Promise<{ default: ComponentType }>;
};

/**
 * Source of truth for the lab. `protolab-create` adds an entry here; nothing else registers a proto.
 * Kept hand-editable (one array) on purpose — no generated file to fight with.
 */
export const PROTOS: Proto[] = [
  {
    slug: "ask-inline",
    name: "Inline ask entry",
    author: "François",
    description: "A second way into the Ask flow, tried inside the real site chrome.",
    axes: [
      { key: "state", label: "State", values: [
        { id: "rest", label: "Rest" },
        { id: "loading", label: "Loading" },
        { id: "answered", label: "Answered" },
      ] },
      { key: "density", label: "Density", values: [
        { id: "cozy", label: "Cozy" },
        { id: "compact", label: "Compact" },
      ] },
    ],
    load: () => import("./protos/ask-inline"),
  },
  {
    slug: "mcp-app-builder",
    name: "MCP App Builder",
    author: "François",
    description: "Turn an existing source (URL, repo, database, dataset) into an MCP app that renders it.",
    axes: [
      { key: "source", label: "Source", values: [
        { id: "url", label: "URL" },
        { id: "repo", label: "Repo" },
        { id: "database", label: "Database / API" },
        { id: "dataset", label: "Dataset" },
      ] },
      { key: "state", label: "State", values: [
        { id: "input", label: "Input" },
        { id: "scanning", label: "Scanning" },
        { id: "result", label: "Result" },
      ] },
      { key: "appType", label: "App type", values: [
        { id: "chart", label: "Chart" },
        { id: "diagram", label: "Diagram" },
        { id: "analysis", label: "Analysis" },
        { id: "explorable", label: "Explorable" },
      ] },
    ],
    load: () => import("./protos/mcp-app-builder"),
  },
];

export const findProto = (slug: string) => PROTOS.find((p) => p.slug === slug);
