import { describe, expect, it } from "vitest";
import { experience } from "@/data/profile";
import { projects } from "@/data/projects";
import { experienceId, resolve, suggestions } from "./context";

describe("contexte de la boîte de dialogue Ask", () => {
  it("propose trois questions générales sans contexte", () => {
    expect(suggestions(null)).toHaveLength(3);
    expect(suggestions(null)[0]).toMatch(/François/);
  });

  it("contextualise les questions sur une expérience", () => {
    const taster = experience.find((x) => x.company === "Taster")!;
    const qs = suggestions({ kind: "experience", id: experienceId(taster) });
    expect(qs).toHaveLength(3);
    expect(qs[0]).toContain("Taster");
    expect(resolve({ kind: "experience", id: experienceId(taster) })?.label).toBe("Taster, VP Product");
  });

  it("contextualise les questions sur un projet", () => {
    const qs = suggestions({ kind: "project", id: projects[0].slug });
    expect(qs[0]).toMatch(/technologies/);
  });

  it("retombe sur les questions générales quand l'identifiant est inconnu", () => {
    expect(resolve({ kind: "project", id: "nexiste-pas" })).toBeNull();
    expect(suggestions({ kind: "project", id: "nexiste-pas" })).toEqual(suggestions(null));
  });

  it("donne un identifiant stable et unique à chaque expérience", () => {
    const ids = experience.map(experienceId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true);
  });
});
