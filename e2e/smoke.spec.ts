import { expect, test } from "@playwright/test";

test("la home affiche le titre et la sandbox", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "François Massanes" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Sandbox" }),
  ).toBeVisible();
});

test("on navigue de la home vers une note et retour", async ({ page }) => {
  await page.goto("/");

  const firstNote = page.getByRole("link", {
    name: "Première note de la sandbox",
  });
  await expect(firstNote).toBeVisible();
  await firstNote.click();

  await expect(page).toHaveURL(/\/sandbox\/hello-sandbox$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "Première note de la sandbox" }),
  ).toBeVisible();
  // Le corps MDX est bien rendu, pas seulement le frontmatter.
  await expect(page.getByText(/pipeline fonctionne/)).toBeVisible();

  await page.getByRole("link", { name: "← retour" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("une note inexistante renvoie 404", async ({ page }) => {
  const response = await page.goto("/sandbox/nexiste-pas");
  expect(response?.status()).toBe(404);
});
