import { expect, test } from "@playwright/test";

test("la home ouvre sur la question, le carnet suit dessous", async ({ page, isMobile }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1, name: "How can I help?" })).toBeVisible();
  await expect(page.getByText("10 years in product and AI in business software")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: /^Work/ })).toBeVisible();
  await expect(page.getByText("Taster")).toBeVisible();

  // Phones fold the tabs into the header's Menu.
  if (isMobile) await page.getByText("Menu", { exact: true }).click();
  const nav = page.getByRole("navigation", { name: "Sections" });
  for (const tab of ["Home", "Work", "Outdoor", "Reading", "MCP"]) {
    await expect(nav.getByRole("link", { name: tab })).toBeVisible();
  }
});

test("la section Lab est présente sur la home", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 2, name: /^Lab/ })).toBeVisible();
});

test("les tabs mènent aux pages détaillées", async ({ page, isMobile }) => {
  await page.goto("/");
  // Phones fold the tabs into the header's Menu, which closes on each navigation.
  const go = async (name: string) => {
    if (isMobile) await page.getByText("Menu", { exact: true }).click();
    await page.getByRole("navigation", { name: "Sections" }).getByRole("link", { name }).click();
  };

  await go("Work");
  await expect(page).toHaveURL(/\/work$/);
  await expect(page.getByRole("heading", { level: 2, name: "Career" })).toBeVisible();

  await go("Outdoor");
  await expect(page).toHaveURL(/\/outdoor$/);
  await expect(page.getByRole("img", { name: /Mont Charvin loop, seen from above/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download GPX" }).first()).toHaveAttribute("href", /\.gpx$/);

  await go("reading");
  await expect(page).toHaveURL(/\/reading$/);
  await expect(page.getByRole("link", { name: /Getting Real/ })).toBeVisible();

  await go("mcp");
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
