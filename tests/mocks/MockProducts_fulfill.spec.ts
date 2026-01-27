import { test, expect } from "@playwright/test";
/*Note:
AutomationExercise UI is rendering products from normal HTML pages, 
not from /api/* endpoints. so we have intercepted HTML response here*/
test("@MOCK fulfill - mock /products HTML response", async ({ page }) => {
  await page.route("**/products", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: `
        <html>
          <head><title>Mock Products</title></head>
          <body style="font-family: Arial; padding: 20px;">
            <h1>Mocked Products Page</h1>
            <p data-testid="mock-msg">No products available (mocked)</p>
          </body>
        </html>
      `,
    });
  });

  await page.goto("https://automationexercise.com/products");

  await expect(page.getByRole("heading", { name: "Mocked Products Page" })).toBeVisible();
  await expect(page.locator('[data-testid="mock-msg"]')).toHaveText("No products available (mocked)");
});