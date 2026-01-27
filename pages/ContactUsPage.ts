import { expect, Locator, Page } from "@playwright/test";

export class ContactUsPage {

    readonly page: Page;
    readonly contactUS: Locator;
    readonly getInTouch: Locator;
    readonly name: Locator;
    readonly uploadFile: Locator;

    constructor(page: Page) {

        this.page = page;
        this.contactUS = page.getByRole('link', { name: ' Contact us' });
        this.getInTouch = page.locator("h2:has-text('Get In Touch')");
        this.name = page.locator("[data-qa='name']");
        this.uploadFile = page.locator("[name='upload_file']");


    }

    async clickContactUS() {
        await this.contactUS.click();
        await expect(this.getInTouch).toBeVisible();
    }

    async fillContactUsdetails() {
        await this.name.fill("Akshay");
        await this.uploadFile.setInputFiles("/Users/apple/playwright-automationexercise-e2e/testfiles/akfile.pdf");
    }

}