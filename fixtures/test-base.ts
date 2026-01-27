import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import logindata from "../test-data/users.json";

//custom fixture named: loginAsValidUser
type MyFixtures = {
  loginAsValidUser: (page: Page) => Promise<void>;
};

//Extending playwright base test with our fixture
export const mytest = base.extend<MyFixtures>({
  loginAsValidUser: async ({}, use) => {

    //actual login logic insode use() function:
    await use(async (page: Page) => {
      const loginPage = new LoginPage(page);

      await loginPage.goToHomePage();
      await loginPage.navigateToLoginSignUpPage();
      await loginPage.login(logindata.validUser.email, logindata.validUser.password);
      await expect(loginPage.logOutBtn).toBeVisible();
      
    });
  },
});

export { expect };
