import { describe, expect, it } from "vitest";
import { experience } from "@/data/profile";
import { projects } from "@/data/projects";
import { experienceId, resolve, suggestions } from "./context";

describe("contexte du panneau Ask", () => {
  it("propose trois questions générales sans contexte", () => {
    expect(suggestions(null)).toHaveLength(3);
    expect(suggestions(null)[0]).toMatch(/François/);
  });

  it("sert les questions écrites pour l'expérience, pas un gabarit", () => {
    const independent = experience.find((x) => x.company === "Independent")!;
    const qs = suggestions({ kind: "experience", id: experienceId(independent) });
    expect(qs).toEqual(independent.questions);
    expect(qs.join(" ")).not.toMatch(/at Independent/);
    expect(resolve({ kind: "experience", id: experienceId(independent) })?.label).toContain("Independent");
  });

  it("sert les questions écrites pour le projet", () => {
    expect(suggestions({ kind: "project", id: projects[0].slug })).toEqual(projects[0].questions);
  });

  it("retombe sur les questions générales quand l'identifiant est inconnu", () => {
    expect(resolve({ kind: "project", id: "nexiste-pas" })).toBeNull();
    expect(suggestions({ kind: "project", id: "nexiste-pas" })).toEqual(suggestions(null));
  });

  it("chaque expérience et chaque projet porte exactement trois questions", () => {
    for (const item of [...experience, ...projects]) expect(item.questions).toHaveLength(3);
  });

  it("donne un identifiant stable et unique à chaque expérience", () => {
    const ids = experience.map(experienceId);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true);
  });
});
