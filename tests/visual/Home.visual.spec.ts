import { test, expect } from "@playwright/test";

test("@VISUAL Home page UI snapshot", async ({ page }) => {
  await page.goto("https://automationexercise.com/");

  await expect(page).toHaveScreenshot("home.png", {
    fullPage: true,
  });
});
