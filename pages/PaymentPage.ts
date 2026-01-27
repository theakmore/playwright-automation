import { Locator, Page, expect } from "@playwright/test";

export class PaymentPage {


    readonly page: Page;
    readonly nameOnCard: Locator;
    readonly carNumber: Locator;
    readonly cvc: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly confirmAndSubmitBtn: Locator;
    readonly orderSuccess: Locator;


    constructor(page: Page) {
        this.page = page;
        this.nameOnCard = page.locator("[data-qa='name-on-card']");
        this.carNumber = page.locator("[data-qa='card-number']");
        this.cvc = page.locator("[data-qa='cvc']");
        this.expiryMonth = page.locator("[data-qa='expiry-month']");
        this.expiryYear = page.locator("[data-qa='expiry-year']");
        this.confirmAndSubmitBtn = page.getByRole('button', { name: 'Pay and Confirm Order' });
        this.orderSuccess = page.locator("[data-qa='order-placed']");

    }

    async fillPaymentDetails() {
        await this.nameOnCard.fill("Akshay");
        await this.carNumber.fill("1234");
        await this.cvc.fill("221");
        await this.expiryMonth.fill("02");
        await this.expiryYear.fill("2002");

    }
    async clickPayAndConfirmOrder() {
        await this.confirmAndSubmitBtn.click();
        await expect(this.orderSuccess).toHaveText('Order Placed!');
    }
}