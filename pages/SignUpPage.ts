import { Page, Locator } from "@playwright/test";

export class SignUpPage {


    readonly page: Page;
    readonly name: Locator;
    readonly signUpEmail: Locator;
    readonly signUpBtn: Locator;
    readonly password: Locator;
    readonly firstname: Locator;
    readonly lastname: Locator;
    readonly address: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipcode: Locator;
    readonly mobilenumber: Locator;
    readonly createAccBtn: Locator;
    readonly accountCreatedText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByPlaceholder("Name");
        this.signUpEmail = page.locator("[data-qa='signup-email']");
        this.signUpBtn = page.getByRole('button', { name: 'Signup' });
        this.password = page.locator("#password");
        this.firstname = page.locator("#first_name");
        this.lastname = page.locator("#last_name");
        this.address = page.locator("#address1");
        this.country = page.locator("#country");
        this.state = page.locator("#state");
        this.city = page.locator("#city");
        this.zipcode = page.locator("#zipcode");
        this.mobilenumber = page.locator("#mobile_number");
        this.createAccBtn = page.getByRole('button', { name: 'Create Account' });
        this.accountCreatedText = page.getByText("Account Created!");


    }

    async startSignUp(name: string, email: string) {
        await this.name.fill(name);
        await this.signUpEmail.fill(email);
        await this.signUpBtn.click();
    }

    async fillSignUpDetails(password: any, firstname: string, lastname: string, address: any, country: string) {
        await this.password.fill(password);
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.address.fill(address);
        await this.country.selectOption(country);
        await this.state.fill("maharashtra");
        await this.city.fill("pune");
        await this.zipcode.fill("221122");
        await this.mobilenumber.fill("9090909090");
        await this.createAccBtn.click();

    }
}