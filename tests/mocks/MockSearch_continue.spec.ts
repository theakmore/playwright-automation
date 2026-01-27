import { test, expect } from "@playwright/test";

test("@MOCK continue - redirect /products request to /login", async ({ page }) => {
  await page.route("**/products", async (route) => {
    // request is modified and continues to backend
    await route.continue({
      url: "https://automationexercise.com/login",
    });
  });

  await page.goto("https://automationexercise.com/products");

  await expect(page).toHaveURL(/\/login/);
  await expect(page.getByText("Login to your account")).toBeVisible();
});
