import { test, expect } from "@playwright/test";
import { ProductsPage } from "../../pages/ProductsPage";
import productdata from '../../test-data/products.json'
import { mytest } from "../../fixtures/test-base";

mytest('@UI Product search should show results', async ({ page, loginAsValidUser }) => {
    await loginAsValidUser(page); //login done using custom fixture

    const productspage = new ProductsPage(page);
    await productspage.goToProducts();


}

);