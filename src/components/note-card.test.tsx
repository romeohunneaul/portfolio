import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoteCard } from "./note-card";

describe("NoteCard", () => {
  it("affiche le titre et le résumé", () => {
    render(<NoteCard title="Ma note" summary="Un résumé" />);

    expect(screen.getByRole("heading", { name: "Ma note" })).toBeInTheDocument();
    expect(screen.getByText("Un résumé")).toBeInTheDocument();
  });

  it("n'affiche pas de liste de tags quand il n'y en a pas", () => {
    render(<NoteCard title="Ma note" summary="Un résumé" />);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  it("affiche chaque tag préfixé d'un dièse", () => {
    render(<NoteCard title="Ma note" summary="Un résumé" tags={["meta", "gsap"]} />);

    expect(screen.getByText("#meta")).toBeInTheDocument();
    expect(screen.getByText("#gsap")).toBeInTheDocument();
  });

  it("rend le titre cliquable vers la note quand un slug est fourni", () => {
    render(<NoteCard title="Ma note" summary="Un résumé" slug="ma-note" />);

    expect(screen.getByRole("link", { name: "Ma note" })).toHaveAttribute(
      "href",
      "/sandbox/ma-note",
    );
  });

  it("laisse le titre non cliquable sans slug", () => {
    render(<NoteCard title="Ma note" summary="Un résumé" />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("expose la date dans un élément time daté", () => {
    render(<NoteCard title="Ma note" summary="Un résumé" date="2026-08-24" />);

    const time = screen.getByText("2026-08-24");
    expect(time.tagName).toBe("TIME");
    expect(time).toHaveAttribute("dateTime", "2026-08-24");
  });
});
