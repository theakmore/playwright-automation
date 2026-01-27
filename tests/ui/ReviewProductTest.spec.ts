import { test, expect } from "@playwright/test";
import { ReviewProductPage } from "../../pages/ReviewProductPage";

test('@UI review product test direct login via storage state', async ({ browser }) => {

    //inject stored login session into browser context
    const context = await browser.newContext({ storageState: "storage/state.json", });
    const page = await context.newPage();
    const reviewproductpage = new ReviewProductPage(page);
    await reviewproductpage.reviewProductAndSubmit();

}

);