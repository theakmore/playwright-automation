import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import { LoginPage } from "../../pages/LoginPage";
import logindata from '../../test-data/users.json'
import { CartPage } from "../../pages/CartPage";
import { PaymentPage } from "../../pages/PaymentPage";

test('@UI Place order test - end to end', async ({ page }) => {
    const productName = "Madame Top For Women";

    const loginpage = new LoginPage(page);
    await loginpage.goToHomePage();
    await loginpage.navigateToLoginSignUpPage();
    await loginpage.login(logindata.validUser.email, logindata.validUser.password);
    await expect(loginpage.logOutBtn).toBeVisible();
    await expect(loginpage.loggedInAsText).toBeVisible();

    const productspage = new ProductsPage(page);
    await productspage.goToProducts();
    await productspage.searchproductAndAddToCart(productName);

    const cartpage = new CartPage(page);
    await cartpage.verifyProductDisplayedInCart(productName);
    await cartpage.clickCheckout();
    await cartpage.clickPlaceOrder();

    const paymentpage = new PaymentPage(page);
    await paymentpage.fillPaymentDetails();
    await paymentpage.clickPayAndConfirmOrder();

}
);