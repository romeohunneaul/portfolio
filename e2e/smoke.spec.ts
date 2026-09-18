import { expect, test } from "@playwright/test";

test("la home affiche la bio, le parcours et les tabs", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /Product manager/ })).toBeVisible();
  await expect(page.getByText(/Product manager, AI in business software/)).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /^Work/ })).toBeVisible();
  await expect(page.getByText("Taster")).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Sections" });
  for (const tab of ["home", "work", "trail", "reading", "mcp"]) {
    await expect(nav.getByRole("link", { name: tab })).toBeVisible();
  }
});

test("on navigue de la home vers une note et retour", async ({ page }) => {
  await page.goto("/");

  const firstNote = page.getByRole("link", { name: /Première note de la sandbox/ });
  await expect(firstNote).toBeVisible();
  await firstNote.click();

  await expect(page).toHaveURL(/\/sandbox\/hello-sandbox$/);
  await expect(page.getByRole("heading", { level: 1, name: "Première note de la sandbox" })).toBeVisible();
  await expect(page.getByText(/pipeline fonctionne/)).toBeVisible();

  await page.getByRole("link", { name: "Back to the notebook" }).click();
  await expect(page).toHaveURL(/\/(#lab)?$/);
});

test("les tabs mènent aux pages détaillées", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });

  await nav.getByRole("link", { name: "work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 2, name: "Career" })).toBeVisible();

  await nav.getByRole("link", { name: "trail" }).click();
  await expect(page).toHaveURL(/\/trail$/);
  await expect(page.getByRole("img", { name: /Mont Charvin loop, seen from above/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download GPX" }).first()).toHaveAttribute("href", /\.gpx$/);

  await nav.getByRole("link", { name: "reading" }).click();
  await expect(page).toHaveURL(/\/reading$/);
  await expect(page.getByRole("link", { name: /The Bitter Lesson/ })).toBeVisible();

  await nav.getByRole("link", { name: "mcp" }).click();
  await expect(page).toHaveURL(/\/mcp$/);
  await expect(page.getByText("get_profile")).toBeVisible();
});

test("un projet se déplie sur /work", async ({ page }) => {
  await page.goto("/work");
  const summary = page.getByText("A catalogue you can talk to");
  await summary.click();
  await expect(page.getByText(/Publisher feeds are poor/)).toBeVisible();
});

test("le serveur MCP liste ses tools", async ({ request }) => {
  const res = await request.post("/api/mcp", {
    headers: { "content-type": "application/json", accept: "application/json, text/event-stream" },
    data: { jsonrpc: "2.0", id: 1, method: "tools/list" },
  });
  expect(res.ok()).toBe(true);
  const body = await res.text();
  expect(body).toContain("get_profile");
  expect(body).toContain("search");
});

test("une note inexistante renvoie 404", async ({ page }) => {
  const response = await page.goto("/sandbox/nexiste-pas");
  expect(response?.status()).toBe(404);
});
