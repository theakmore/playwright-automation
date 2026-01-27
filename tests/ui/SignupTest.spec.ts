import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { SignUpPage } from "../../pages/SignUpPage";
import { generateRandomEmail, generateRandomName } from "../../utils/dataGenerator";

test('@UI Signup - create new user account', async ({ page }) => {

    const firstName = "Akshay";
    const lastName = "More";
    const address = "pune";

    const loginpage = new LoginPage(page);
    await loginpage.goToHomePage();
    await loginpage.navigateToLoginSignUpPage();

    const signuppage = new SignUpPage(page);
    await signuppage.startSignUp(generateRandomName(), generateRandomEmail());
    await signuppage.fillSignUpDetails("Pass@123", firstName, lastName, address, "India");

    expect(signuppage.accountCreatedText).toHaveText("Account Created!");

}
);