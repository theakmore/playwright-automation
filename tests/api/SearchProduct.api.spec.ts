import { test, expect, request } from '@playwright/test'
import { ApiClient } from '../../utils/api/ApiClient'
import { ProductsApi } from '../../utils/api/ProductsApi'

test('@API Search product API', async () => {
    const apiContext = await request.newContext();
    const client = new ApiClient(apiContext);

    const productsApi = new ProductsApi(client);
    const response = await productsApi.searchProduct("dress");

    console.log(response); //for debugging
    expect(response.responseCode).toBe(200);
    expect(response.products.length).toBeGreaterThan(0);


});