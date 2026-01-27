import { Page, Locator, expect } from "@playwright/test";

export class ReviewProductPage {

    readonly page: Page;
    readonly viewproduct: Locator;
    readonly name: Locator;
    readonly email: Locator;
    readonly review: Locator;
    readonly submitBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.viewproduct = page.getByRole('link', { name: 'View Product' });
        this.name = page.locator("#name");
        this.email = page.locator("#email");
        this.review = page.getByPlaceholder('Add Review Here!');
        this.submitBtn = page.locator("#button-review");
    }


    async reviewProductAndSubmit() {
        await this.page.goto("https://automationexercise.com/products");
        await this.viewproduct.nth(0).click();
        await this.name.fill("Akshay");
        await this.email.fill("akmore@gmail.com");
        await this.review.fill("Very good product");
        await this.submitBtn.click();

    }



}