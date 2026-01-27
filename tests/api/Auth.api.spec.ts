import {test , expect , request} from '@playwright/test'
import { ApiClient } from '../../utils/api/ApiClient'
import { AuthApi } from '../../utils/api/AuthApi'
import users from "../../test-data/users.json";

test('@API Verify login API' , async()=>
{
   const apiContext =  await request.newContext();
   const client = new ApiClient(apiContext);

   const authapi = new AuthApi(client);
   const response = await authapi.verifyLogin(users.validUser.email , users.validUser.password);

   console.log(response); //for debugging
   expect(response.responseCode).toBe(200);
   expect(response.message).toContain("User exists");


});