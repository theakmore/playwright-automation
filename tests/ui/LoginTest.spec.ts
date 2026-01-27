import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import logindata from '../../test-data/users.json'

test('@UI Login - valid user should login successfully', async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goToHomePage();
    await loginpage.navigateToLoginSignUpPage();
    await loginpage.login(logindata.validUser.email, logindata.validUser.password);
    await expect(loginpage.logOutBtn).toBeVisible();
    await expect(loginpage.loggedInAsText).toBeVisible();

});

test('@UI Login - invalid user should show error', async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goToHomePage();
    await loginpage.navigateToLoginSignUpPage();
    await loginpage.login(logindata.invalidUser.email, logindata.invalidUser.password);
    await expect(loginpage.loginErrorText).toBeVisible();

});