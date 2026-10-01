import { expect, test } from "@playwright/test";

const panel = (page: import("@playwright/test").Page) => page.getByRole("dialog");

test("⌘K ouvre le panneau avec le champ prêt, les questions arrivent ensuite", async ({ page, hasTouch }) => {
  await page.goto("/work");
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
  // /work : pas de champ sur la page, le bouton flottant du téléphone reste visible.
  await page.goto("/work");
  // Le bouton du header (desktop) ou le bouton flottant (téléphone, son nom suit la ligne lue).
  await page.getByRole("button", { name: /^Ask (⌘K$|about )/ }).filter({ visible: true }).first().click();

  const dialog = panel(page);
  await dialog.getByLabel("Your question").fill("What is his favourite cheese?");
  await dialog.getByRole("button", { name: "Ask", exact: true }).click();

  await expect(dialog.getByText("Ask François directly")).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Mail" })).toHaveAttribute("href", /^mailto:/);
  await expect(dialog.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", /linkedin\.com/);
});

test("l'API refuse une requête mal formée", async ({ request }) => {
  const res = await request.post("/api/chat", { data: { messages: [] } });
  expect([400, 503]).toContain(res.status());
});

test("un besoin décrit depuis la home ouvre le panneau et part tout de suite", async ({ page }) => {
  await page.route("**/api/chat", (route) => route.fulfill({ status: 503, json: { error: "down" } }));
  await page.goto("/");
  // Le champ de la home ne répond qu'après l'hydratation : on réessaie jusqu'à ce que le panneau s'ouvre.
  await expect(async () => {
    await page.getByLabel("Describe what you need").fill("What is Cryospace?");
    await page.getByLabel("Describe what you need").press("Enter");
    await expect(panel(page)).toBeVisible({ timeout: 1000 });
  }).toPass();

  const dialog = panel(page);
  await expect(dialog.getByText("What is Cryospace?")).toBeVisible();
  await expect(dialog.getByText("Ask François directly")).toBeVisible();
});

test("le profil est un scroll sous le Ask", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByLabel("Describe what you need")).toBeInViewport();
  await expect(page.getByRole("heading", { name: "Work" })).not.toBeInViewport();

  await page.getByRole("link", { name: /or read the notebook/ }).click();
  await expect(page.getByRole("heading", { name: "Work" })).toBeInViewport();
});

test("une amorce remplit le champ avec son exemple, puis les amorces s'effacent", async ({ page, isMobile }) => {
  test.skip(isMobile, "sur téléphone, les amorces vivent dans la feuille Examples");
  await page.goto("/");
  const field = page.getByLabel("Describe what you need");
  await expect(async () => {
    await page.getByRole("button", { name: "I have a product problem…" }).click();
    await expect(field).toHaveValue("Our onboarding loses half the users in week one…", { timeout: 1000 });
  }).toPass();
  await expect(field).toBeFocused();
  await expect(page.getByRole("button", { name: "I'm hiring…" })).toBeHidden();

  await field.fill("");
  await expect(page.getByRole("button", { name: "I'm hiring…" })).toBeVisible();
});

test("sur la home, ⌘K va dans le champ du hero", async ({ page, isMobile }) => {
  test.skip(isMobile, "raccourci clavier");
  await page.goto("/");
  const field = page.getByLabel("Describe what you need");
  await expect(async () => {
    await page.keyboard.press("ControlOrMeta+k");
    await expect(field).toBeFocused({ timeout: 1000 });
  }).toPass();
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("sur téléphone, le bouton flottant s'efface tant que le champ de la home est à l'écran", async ({ page, isMobile }) => {
  test.skip(!isMobile, "le bouton flottant n'existe que sur téléphone");
  await page.goto("/");
  const fab = page.getByRole("button", { name: /^Ask about/ });
  await expect(fab).toBeHidden();

  await page.getByRole("heading", { name: "Work" }).scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, 600);
  await expect(fab).toBeVisible();
});

test("sur téléphone, Examples ouvre une feuille d'amorces qui remplit le champ", async ({ page, isMobile }) => {
  test.skip(!isMobile, "la feuille n'existe que sur téléphone");
  await page.goto("/");
  const sheet = page.getByRole("dialog", { name: "Start from" });
  await expect(async () => {
    await page.getByRole("button", { name: "Examples" }).click();
    await expect(sheet).toBeVisible({ timeout: 1000 });
  }).toPass();
  await expect(sheet.getByRole("button", { name: /Just curious/ })).toBeVisible();

  await sheet.getByRole("button", { name: /A product problem/ }).click();
  await expect(sheet).toBeHidden();
  const field = page.getByLabel("Describe what you need");
  await expect(field).toHaveValue("Our onboarding loses half the users in week one…");
  await expect(field).toBeFocused();
});
