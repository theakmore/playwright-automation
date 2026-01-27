import { ApiClient } from "./ApiClient";

export class ProductsApi {

    client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async getAllProducts() {
        return await this.client.get("https://automationexercise.com/api/productsList");
    }

    async searchProduct(productName: string) {
        return await this.client.postForm("https://automationexercise.com/api/searchProduct", {
            search_product: productName
        });

    }
}