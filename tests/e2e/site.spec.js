import { expect, test } from "@playwright/test";

test("Home → Rooms → Single Room flow", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Luxurious rooms/i })).toBeVisible();
  await page.getByRole("link", { name: /our rooms/i }).first().click();
  await expect(page).toHaveURL(/\/rooms$/);
  await expect(page.getByText("Single Deluxe").first()).toBeVisible();

  await page.locator('[data-testid="room-card-single-deluxe"]').getByRole("link", { name: /features/i }).click();
  await expect(page).toHaveURL(/\/rooms\/single-deluxe$/);
  await expect(page.getByText(/Premium single/i)).toBeVisible();
});

test("404 page for unknown room", async ({ page }) => {
  await page.goto("/rooms/nope");
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
});

test("Filter narrows room list", async ({ page }) => {
  await page.goto("/rooms");
  const before = await page.locator("[data-testid^='room-card-']").count();
  await page.selectOption("#f-type", "family");
  const after = await page.locator("[data-testid^='room-card-']").count();
  expect(after).toBeLessThan(before);
  // every visible card should be a family room — fixture has 2 family rooms
  expect(after).toBeGreaterThanOrEqual(2);
});

test("Empty-state when filters match nothing", async ({ page }) => {
  await page.goto("/rooms");
  await page.selectOption("#f-type", "single");
  await page.selectOption("#f-capacity", "6");
  await expect(page.getByText(/no rooms match/i)).toBeVisible();
});
