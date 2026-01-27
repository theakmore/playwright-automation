import { Page, Locator } from "@playwright/test";

export class LoginPage {


    page: Page;
    signUploginBtn: Locator;
    email: Locator;
    password: Locator;
    loginBtn: Locator;
    logOutBtn: Locator;
    loggedInAsText: Locator;
    loginErrorText: Locator;



    constructor(page: Page) {

        this.page = page;
        this.signUploginBtn = page.getByRole('link', { name: ' Signup / Login' });
        this.email = page.locator("[data-qa='login-email']");
        this.password = page.getByPlaceholder("Password");
        this.loginBtn = page.getByRole("button", { name: 'Login' });
        this.logOutBtn = page.locator("a[href='/logout']");
        this.loggedInAsText = page.getByText(" Logged in as ");
        this.loginErrorText = page.getByText("Your email or password is incorrect!");



    }

    async goToHomePage() {
        await this.page.goto("https://automationexercise.com/");
    }

    async navigateToLoginSignUpPage() {
        await this.signUploginBtn.click();
    }

    async login(username: string, password: any) {
        await this.email.fill(username);
        await this.password.fill(password);
        await this.loginBtn.click();
    }


}