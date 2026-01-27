import { ApiClient } from "./ApiClient";

export class AuthApi {
    client: ApiClient;

    constructor(client: ApiClient) {
        this.client = client;
    }

    async verifyLogin(email: string, password: string) {
        return await this.client.postForm("https://automationexercise.com/api/verifyLogin", {
            email,
            password
        });
    }

}