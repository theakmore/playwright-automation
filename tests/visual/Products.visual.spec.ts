import { test, expect } from "@playwright/test";

test("@VISUAL Products page UI snapshot", async ({ page }) => {
  await page.goto("https://automationexercise.com/products");

  await expect(page).toHaveScreenshot("products.png", {
    fullPage: true,
  });
});
