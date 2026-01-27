import { test, expect } from "@playwright/test";

test("@MOCK abort - simulate server down for /products", async ({ page }) => {
  await page.route("**/products", async (route) => {
    await route.abort();
  });

  // navigation should fail
  await expect(page.goto("https://automationexercise.com/products")).rejects.toThrow();
});
