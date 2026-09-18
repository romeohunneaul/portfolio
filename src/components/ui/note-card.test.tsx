import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NoteCard } from "./note-card";

describe("NoteCard", () => {
  it("lie le titre vers la note quand un slug est fourni", () => {
    render(<NoteCard title="Ma note" slug="ma-note" />);
    expect(screen.getByRole("link", { name: /Ma note/ })).toHaveAttribute("href", "/sandbox/ma-note");
  });

  it("n'affiche pas de lien sans slug", () => {
    render(<NoteCard title="Ma note" />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Ma note")).toBeInTheDocument();
  });

  it("affiche la date en mois abrégé + année et les tags", () => {
    render(<NoteCard title="Ma note" date="2026-08-27" tags={["demo", "ai"]} />);
    expect(screen.getByText("Aug 2026")).toBeInTheDocument();
    expect(screen.getByText("demo")).toBeInTheDocument();
    expect(screen.getByText("ai")).toBeInTheDocument();
  });

  it("n'affiche ni date ni tags quand il n'y en a pas", () => {
    render(<NoteCard title="Ma note" />);
    expect(screen.queryByRole("time")).not.toBeInTheDocument();
  });
});
