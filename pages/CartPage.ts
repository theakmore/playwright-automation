import { Locator, Page, expect } from "@playwright/test";

export class CartPage {

    readonly page: Page;
    readonly productInCart: Locator;
    readonly checkOutBtn: Locator;
    readonly placeOrder: Locator;


    constructor(page: Page) {

        this.page = page;
        this.productInCart = page.locator(".cart_description");
        this.checkOutBtn = page.locator(".btn-default.check_out");
        this.placeOrder = page.getByRole('link', { name: 'Place Order' });
    }

    async verifyProductDisplayedInCart(productName: string) {
        await this.checkOutBtn.waitFor();
       await expect(this.productInCart.filter({ hasText: productName })).toContainText(productName);
    }

    async clickCheckout() {
        await this.checkOutBtn.click();
    }

    async clickPlaceOrder() {
        await this.placeOrder.click();
    }
}