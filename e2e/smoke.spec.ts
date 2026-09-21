import { expect, test } from "@playwright/test";

test("la home affiche la bio, le parcours et les tabs", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: /Product manager/ })).toBeVisible();
  await expect(page.getByText(/Product manager, AI in business software/)).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /^Work/ })).toBeVisible();
  await expect(page.getByText("Taster")).toBeVisible();

  const nav = page.getByRole("navigation", { name: "Sections" });
  for (const tab of ["Home", "Work", "Outdoor", "Reading", "MCP"]) {
    await expect(nav.getByRole("link", { name: tab })).toBeVisible();
  }
});

test("la section Lab est présente sur la home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2, name: /^Lab/ })).toBeVisible();
});

test("les tabs mènent aux pages détaillées", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Sections" });

  await nav.getByRole("link", { name: "Work" }).click();
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 2, name: "Career" })).toBeVisible();

  await nav.getByRole("link", { name: "Outdoor" }).click();
  await expect(page).toHaveURL(/\/outdoor$/);
  await expect(page.getByRole("img", { name: /Mont Charvin loop, seen from above/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download GPX" }).first()).toHaveAttribute("href", /\.gpx$/);

  await nav.getByRole("link", { name: "reading" }).click();
  await expect(page).toHaveURL(/\/reading$/);
  await expect(page.getByRole("link", { name: /Getting Real/ })).toBeVisible();

  await nav.getByRole("link", { name: "mcp" }).click();
  await expect(page).toHaveURL(/\/mcp$/);
  await expect(page.getByText("get_profile")).toBeVisible();
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
