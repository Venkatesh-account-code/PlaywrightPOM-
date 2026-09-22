//Same Client App here with intercept network response.
const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/Fixtures');
const Loginpayload = { userEmail: "narindi007@gmail.com", userPassword: "Loginpass#7" };
const Orderpayload = { orders: [{ country: "Algeria", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const FakeResponsePayload = { data: [], message: "No Orders" };// Response we want to show instead of actualresponse
/*we are getting FakeResponsePayload from client app login with user who has no orders
 here while clicking orders api hits, in response no orders */

let response;
//here we are getting this orderpayload in network tab , 
// if we want a product click  view buton of that product, in page url we get productOrderedId at last.

// Integrated api in web automation here.
//Client App same,we did login part using api and set token in browser localstorage , so now when page.goto(url)exceutes
//already login done so page diretly goes to page after login and continues the test case.

//before all executes once before all testcases
test.beforeAll(async () => {

    const APIContext = await request.newContext();//like browser context ui,  request context api
    const apiUtils = new APIUtils(APIContext, Loginpayload);

    response = await apiUtils.CreateOrder(Orderpayload);



});

//before each executes for every test case.
test.beforeEach(() => {


});


test('New Website Login', async function ({ page }) {



    await page.addInitScript(value => {
        window.localStorage.setItem("token", value)
    }, response.token);



    await page.goto("https://rahulshettyacademy.com/client");
    // API hits with URL in network tab,now we get response for that API Hit, now actualresponse shows in UI
    // Now we hit same url, but show fakeresponse (response we want to show instead of actual response)
    // route.fulfill method sends the response to browser , here in this method we are saying overwrite response with body and send

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", async route => {

        const response = await page.request.fetch(route.request());//fetches the actual response.

        let body = JSON.stringify(FakeResponsePayload);
        route.fulfill(
            {
                response,
                body,

            }
        )

    });



    await page.locator("[routerlink*='myorders']").click();
    // we might get delay in getting actual response, we should get actual response before sending fake response
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");//so wait for actual response
    console.log(await page.locator(".mt-4").textContent());


});