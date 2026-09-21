import { expect, test } from "@playwright/test";

const panel = (page: import("@playwright/test").Page) => page.getByRole("dialog");

test("⌘K ouvre le panneau avec le champ prêt, les questions arrivent ensuite", async ({ page, hasTouch }) => {
  await page.goto("/");
  const dialog = panel(page);
  // Le raccourci n'existe qu'après l'hydratation : on réessaie jusqu'à ce qu'il réponde.
  await expect(async () => {
    await page.keyboard.press("ControlOrMeta+k");
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();

  await expect(dialog.getByRole("heading", { name: "Ask about François" })).toBeVisible();
  // Sur tactile, pas de focus automatique : il ouvrirait le clavier par-dessus la fiche.
  if (!hasTouch) await expect(dialog.getByLabel("Your question")).toBeFocused();
  await expect(dialog.getByRole("button", { name: "What does François do today?" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("une expérience ouvre le panneau avec son détail et ses questions", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Taster — VP Product/ }).click();

  const dialog = panel(page);
  await expect(dialog.getByRole("heading", { name: "Taster, VP Product" })).toBeVisible();
  await expect(dialog.getByText(/Kept going into kitchens/)).toBeVisible();
  await expect(dialog.getByRole("button", { name: "How did he run the product team there?" })).toBeVisible();
});

test("taper fait disparaître les questions suggérées", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Taster — VP Product/ }).click();
  const dialog = panel(page);
  await expect(dialog.getByRole("button", { name: "How did he run the product team there?" })).toBeVisible();
  await dialog.getByLabel("Your question").fill("stack");
  await expect(dialog.getByRole("button", { name: "How did he run the product team there?" })).toBeHidden();
});

test("un projet ouvre le panneau avec le problème et l'approche", async ({ page }) => {
  await page.goto("/work");
  await page.getByRole("button", { name: /A catalogue you can talk to/ }).click();
  const dialog = panel(page);
  await expect(dialog.getByText(/Publisher feeds are poor/)).toBeVisible();
  await expect(dialog.getByRole("button", { name: "What is next on the roadmap?" })).toBeVisible();
});

test("sans réponse de l'assistant, la carte de contact apparaît", async ({ page }) => {
  await page.route("**/api/chat", (route) => route.fulfill({ status: 503, json: { error: "down" } }));
  await page.goto("/");
  await page.getByRole("button", { name: /^Ask/ }).first().click();

  const dialog = panel(page);
  await dialog.getByLabel("Your question").fill("What is his favourite cheese?");
  await dialog.getByRole("button", { name: "Ask", exact: true }).click();

  await expect(dialog.getByText("Ask François directly")).toBeVisible();
  await expect(dialog.getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", /^https:\/\/wa\.me\//);
  await expect(dialog.getByRole("link", { name: "Mail" })).toHaveAttribute("href", /^mailto:/);
});

test("l'API refuse une requête mal formée", async ({ request }) => {
  const res = await request.post("/api/chat", { data: { messages: [] } });
  expect([400, 503]).toContain(res.status());
});
