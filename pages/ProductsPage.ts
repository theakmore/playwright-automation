import { Page, Locator, expect } from "@playwright/test";

export class ProductsPage {

    readonly page: Page;
    readonly products: Locator;
    readonly AllProducts: Locator;
    readonly searchProduct: Locator;
    readonly searchBtn: Locator;
    readonly productCards: Locator;
    readonly allProducts: Locator;
    readonly addedToCart: Locator;
    readonly addedToCartSuccess: Locator;
    readonly viewCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.getByRole('link', { name: ' Products' });
        this.AllProducts = page.locator("h2:has-text('All Products')");
        this.searchProduct = page.getByPlaceholder("Search Product");
        this.searchBtn = page.locator("#submit_search:visible");
        this.productCards = page.locator('.product-image-wrapper');
        this.allProducts = page.locator(".productinfo.text-center");
        this.addedToCart = page.locator(".modal-content");
        this.addedToCartSuccess = page.locator("div.modal-body p");
        this.viewCart = page.locator("div.modal-body a");

    }

    async goToProducts() {
        await this.products.click();
        await this.AllProducts.isVisible();
    }

    async searchTheProduct(productName: string) {
        await this.searchProduct.fill(productName);
        await this.searchBtn.click();
        expect(await this.searchProduct.getAttribute("value")).toEqual(productName);

    }

    async assertAtLeastOneProductShown() {
        await expect(this.productCards.first()).toBeVisible();
    }

    async searchproductAndAddToCart(productName: string) {

        const count = await this.allProducts.count();
        for (let i = 0; i < count; i++) {
            if (await this.allProducts.nth(i).locator("p").textContent() === productName) {
                await this.allProducts.nth(i).getByText('Add to cart').click();
                break;
            }
        }
        await this.addedToCart.waitFor();
        await expect(this.addedToCartSuccess.nth(0)).toHaveText("Your product has been added to cart.");
        await this.viewCart.click();

    }

}