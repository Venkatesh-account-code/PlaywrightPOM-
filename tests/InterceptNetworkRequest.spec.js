const { test, expect } = require('@playwright/test');

//Client App login and in orders history page, click view , network tab api url hits, now we r saying hit with fakeurl.
// here we give that fakeurl in route.continue({url:"..fakeurl.."})
//this hitting with fake url before clicking view only we should say to playwright in advance.

test('Intercept Network Request', async ({ page }) => {

    //login and reach orders page
    const email = 'narindi007@gmail.com';
    const products = await page.locator('.card-body');
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill("Loginpass#7");
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
     await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
});