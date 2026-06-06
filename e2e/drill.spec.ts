import { test, expect } from "@playwright/test";
import { loginLocal } from "./helpers";

test("drill hub loads and starts flashcard round", async ({ page }) => {
  await loginLocal(page);
  await page.goto("/#/app/drill");
  await expect(page.getByRole("heading", { name: /Kelime & Cümle Merkezi/i })).toBeVisible();
  await page.getByRole("button", { name: /Kelime Ezberle/i }).click();
  await expect(page.getByText(/1\/10/)).toBeVisible({ timeout: 10_000 });
  await expect(page.getByText("Kelime ezberle")).toBeVisible();
});
