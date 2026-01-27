import { test, expect } from "@playwright/test";
import logindata from "../../test-data/users.json";

test("Create storage state for login", async ({ page }) => {
    await page.goto("https://automationexercise.com/");

    await page.getByRole('link', { name: ' Signup / Login' }).click();
    await page.locator("[data-qa='login-email']").fill(logindata.validUser.email);
    await page.getByPlaceholder("Password").fill(logindata.validUser.password);
    await page.getByRole("button", { name: 'Login' }).click();
    await expect(page.locator("a[href='/logout']")).toBeVisible();
    await expect(page.getByText(" Logged in as ")).toBeVisible();

    // now save cookies/session
    await page.context().storageState({ path: "storage/state.json" });
});
