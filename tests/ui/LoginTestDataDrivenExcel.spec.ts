import { test, expect } from "@playwright/test";
import { readExcelData } from "../../utils/excelUtils";
import { LoginPage } from "../../pages/LoginPage";

test("@UI Login - Data Driven from Excel", async ({ page }) => {
  const loginData = await readExcelData("./test-data/LoginData.xlsx");

  for (const data of loginData) {
    const loginPage = new LoginPage(page);

    await test.step(`Running: ${data.testCase}`, async () => {
      await loginPage.goToHomePage();
      await loginPage.navigateToLoginSignUpPage();
      await loginPage.login(data.email, data.password);

      if (data.expected === "success") {
        await expect(loginPage.logOutBtn).toBeVisible();
        await loginPage.logOutBtn.click();
      } else {
        await expect(loginPage.loginErrorText).toBeVisible();
      }
    });
  }
});
