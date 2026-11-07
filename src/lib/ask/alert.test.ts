import { describe, expect, it } from "vitest";
import { formatAlert } from "./alert";

describe("alerte Telegram d'une question Ask", () => {
  it("cite la question, le contexte et la réponse", () => {
    const text = formatAlert({ question: "Quel stack pour Odyssée ?", context: { kind: "project", id: "odyssee" }, turn: 1, answer: "Next.js et Supabase." });
    expect(text).toMatch(/^💬 Question/);
    expect(text).toContain("Nouvelle conversation · project odyssee");
    expect(text).toContain("« Quel stack pour Odyssée ? »");
    expect(text).toContain("Réponse : Next.js et Supabase.");
  });

  it("signale une demande de contact et sa raison", () => {
    const text = formatAlert({ question: "Dispo en janvier ?", context: null, turn: 3, answer: "", contact: "Mission en janvier" });
    expect(text).toMatch(/^📇 Demande de contact/);
    expect(text).toContain("Relance n°3 · accueil");
    expect(text).toContain("Raison : Mission en janvier");
  });

  it("dit qu'il n'y a pas eu de réponse, et coupe une réponse longue", () => {
    expect(formatAlert({ question: "?", context: null, turn: 1 })).toContain("Pas de réponse");
    const long = formatAlert({ question: "?", context: null, turn: 1, answer: "a".repeat(1000) });
    expect(long).toContain(`${"a".repeat(400)}…`);
    expect(long).not.toContain("a".repeat(401));
  });
});
