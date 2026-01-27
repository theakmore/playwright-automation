import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import logindata from '../../test-data/users.json'
import { ContactUsPage } from "../../pages/ContactUsPage";

test('@UI contact us test upload file scenario', async ({ page }) => {

    const loginpage = new LoginPage(page);
    await loginpage.goToHomePage();
    await loginpage.navigateToLoginSignUpPage();
    await loginpage.login(logindata.validUser.email, logindata.validUser.password);
    await expect(loginpage.logOutBtn).toBeVisible();
    await expect(loginpage.loggedInAsText).toBeVisible();

    const contactuspage = new ContactUsPage(page);
    await contactuspage.clickContactUS();
    await contactuspage.fillContactUsdetails();


});