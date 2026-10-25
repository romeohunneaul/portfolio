import { expect, test } from "@playwright/test";

// The note is a draft: it answers at its URL outside production, and stays off the home page.

test("la note protolab montre le parcours et ce que l'outil garde ou ajoute", async ({ page, isMobile }) => {
  await page.goto("/sandbox/protolab");

  const journey = page.getByRole("region", { name: "What I used before" });
  if (isMobile) {
    // Phones get one block per tool instead of the grid.
    await expect(journey.getByRole("table")).toBeHidden();
    await expect(journey.getByText("protolab", { exact: true }).filter({ visible: true })).toBeVisible();
  } else {
    await expect(journey.getByRole("columnheader", { name: "protolab" })).toBeVisible();
  }

  const points = page.getByRole("region", { name: "What it keeps and what it adds" });
  await points.getByRole("listitem").filter({ hasText: "Data scenarios" }).getByRole("button").click();
  // The scenarios point loads the worst case.
  await expect(points.getByText("2,418").filter({ visible: true }).first()).toBeVisible();

  await expect(page.getByRole("link", { name: "romeohunneaul/protolab" })).toHaveAttribute("href", "https://github.com/romeohunneaul/protolab");
});

test("la note protolab, en brouillon, n'est pas listée sur la home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Prototyping on the real product")).toHaveCount(0);
});
