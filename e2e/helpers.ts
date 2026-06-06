import { expect, type Page } from "@playwright/test";

export async function loginLocal(page: Page) {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByText("English")).toBeVisible();
  await page.locator("button").filter({ hasText: "Hülya" }).click();
  await page.getByPlaceholder("••••").fill("1854");
  await page.getByRole("button", { name: "Çalışmaya başla" }).click();
  await page.waitForURL(/#\/app/);
  if (page.url().includes("/modes")) {
    await page.locator("button").filter({ hasText: "Work" }).click();
  }
  await expect(page).toHaveURL(/#\/app\/?$/);
}
