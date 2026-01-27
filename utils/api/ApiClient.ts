
import { APIRequestContext, expect } from "@playwright/test";


export class ApiClient {
    apiContext: APIRequestContext;

    constructor(apiContext: APIRequestContext) {
        this.apiContext = apiContext;
    }

    async get(url: string) {
        const response = await this.apiContext.get(url);
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async postForm(url: string, formData: Record<string, string>) //object with string keys and string values
    {
        const response = await this.apiContext.post(url,
            {
                form: formData
            }
        );
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }


}