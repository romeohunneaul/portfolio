import { expect, test } from "@playwright/test";

test("⌘K ouvre la boîte Ask avec les questions générales", async ({ page }) => {
  await page.goto("/");
  const dialog = page.getByRole("dialog", { name: "Ask about François" });
  // Le raccourci n'existe qu'après l'hydratation : on réessaie jusqu'à ce qu'il réponde.
  await expect(async () => {
    await page.keyboard.press("ControlOrMeta+k");
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();
  await expect(dialog.getByRole("button", { name: "What does François do today?" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("le lien d'une expérience ouvre des questions contextualisées", async ({ page }) => {
  await page.goto("/");
  const taster = page.getByRole("listitem").filter({ hasText: "Taster" });
  await taster.getByRole("button", { name: /Want to know more/ }).click();

  const dialog = page.getByRole("dialog", { name: "Ask about François" });
  await expect(dialog.getByText("About: Taster, VP Product")).toBeVisible();
  await expect(dialog.getByRole("button", { name: "What was the impact at Taster?" })).toBeVisible();
});

test("sans réponse de l'assistant, la carte de contact apparaît", async ({ page }) => {
  await page.route("**/api/chat", (route) => route.fulfill({ status: 503, json: { error: "down" } }));
  await page.goto("/");
  await page.getByRole("button", { name: /^Ask/ }).first().click();

  const dialog = page.getByRole("dialog", { name: "Ask about François" });
  await dialog.getByLabel("Your question").fill("What is his favourite cheese?");
  await dialog.getByRole("button", { name: "Ask", exact: true }).click();

  await expect(dialog.getByText("Ask François directly")).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Mail" })).toHaveAttribute("href", /^mailto:/);
});

test("l'API refuse une requête mal formée", async ({ request }) => {
  const res = await request.post("/api/chat", { data: { messages: [] } });
  expect([400, 503]).toContain(res.status());
});
