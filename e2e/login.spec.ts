import { test, expect } from "@playwright/test";
import { loginLocal } from "./helpers";

test("login with local PIN and pick work mode", async ({ page }) => {
  await loginLocal(page);
  await expect(page.getByText(/Günaydın|İyi günler|İyi akşamlar/)).toBeVisible();
});
