import { test, expect, request } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { ProductsApi } from "../../utils/api/ProductsApi";

test("@API Products list API", async () => {

  const apiContext = await request.newContext();
  const client = new ApiClient(apiContext);

  const productsApi = new ProductsApi(client);

  const response = await productsApi.getAllProducts();

  console.log(response); //for debugging
  expect(response.responseCode).toBe(200);
  expect(response.products.length).toBeGreaterThan(0);

});