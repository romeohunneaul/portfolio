import { expect, test } from "@playwright/test";

test.use({ colorScheme: "light" });

test("le switch du header passe le site en mode nuit et le choix survit au rechargement", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const toggle = page.getByRole("banner").getByRole("switch", { name: "Night mode" });

  await expect(html).toHaveAttribute("data-theme", "light");
  await expect(toggle).toHaveAttribute("aria-checked", "false");

  await toggle.click();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-checked", "true");

  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "dark");
  await expect(page.getByRole("banner").getByRole("switch", { name: "Night mode" })).toHaveAttribute("aria-checked", "true");
});

test.describe("sans choix enregistré", () => {
  test.use({ colorScheme: "dark" });

  test("le site suit le réglage sombre du système", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
