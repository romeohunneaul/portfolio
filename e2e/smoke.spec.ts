import { expect, test } from "@playwright/test";

test("la home répond et rend du contenu", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator("body")).toBeVisible();
});
