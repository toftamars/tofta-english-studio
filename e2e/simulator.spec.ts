import { test, expect } from "@playwright/test";
import { loginLocal } from "./helpers";

test("simulator list shows scenarios", async ({ page }) => {
  await loginLocal(page);
  await page.goto("/#/app/simulator");
  await expect(page.getByRole("heading", { name: /Simülatör/i })).toBeVisible();
  await expect(page.locator("a[href*='/app/simulator/']").first()).toBeVisible();
});

test("open first scenario play view", async ({ page }) => {
  await loginLocal(page);
  await page.goto("/#/app/simulator");
  await page.locator("a[href*='/app/simulator/']").first().click();
  await expect(page.getByText(/Simülatöre dön|Devam/)).toBeVisible({ timeout: 10_000 });
});
