const { test, expect } = require('@playwright/test');
let Context2;
// here we did login in context1 and passed the storage state to context2 so that context2 can skip login and continue test case
test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill("narindi007@gmail.com");
    await page.locator('#userPassword').fill("Loginpass#7");
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
    await context.storageState({ path: 'state.json' });// gets the localstorage of this browser context1 and stores it in state.json
    Context2 = await browser.newContext({ storageState: 'state.json' });// creating context2 with storagestate state.json of context1
});


test('@API New Website Login', async function () {
    const productName = 'ZARA COAT 3';
    const email = 'narindi007@gmail.com';
    const page = await Context2.newPage();// here we are creating page for context2 
    await page.goto("https://rahulshettyacademy.com/client");
    const products = await page.locator('.card-body');
    const Titles = await page.locator('.card-body b').allTextContents();

    const count = await products.count();

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            await products.nth(i).locator("text=' Add To Cart'").click();
            break;
        }
    }

    await page.locator('[routerlink="/dashboard/cart"]').click();
    await page.locator('div li').first().waitFor();

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();


    expect(bool).toBeTruthy();

    await page.locator('button[type="button"]').nth(1).click();

    await page.locator("[placeholder= 'Select Country']").pressSequentially('ind');
    const dynamicdropdown = page.locator(".ta-results").nth(0);
    await dynamicdropdown.waitFor();
    const dropdownoptions = await dynamicdropdown.locator("button");
    const optionscount = await dropdownoptions.count();
    for (let i = 0; i < optionscount; i++) {
        let optiontext = await dropdownoptions.nth(i).textContent();
        if (optiontext === " India") {
            await dropdownoptions.nth(i).click();
            break;
        }
    }

    await page.locator(".field [type='text']").first().fill("12345098761112");
    await page.locator(".field select").first().selectOption("07");
    await page.locator(".field select").last().selectOption("07");
    await page.locator(".field input").nth(1).fill("3457");
    await page.locator(".field input").nth(2).fill("Venkatesh");

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(OrderId);

    await page.locator(".em-spacer-1 [routerlink*='myorders']").click();

    await page.locator("tbody").waitFor();
    await page.locator("tbody tr").last().waitFor();
    const AllOrderCards = await page.locator("tbody tr");
    console.log("cards scanned");
    const AllOrderCardCount = await AllOrderCards.count();
    console.log(AllOrderCardCount);

    for (let i = 0; i < AllOrderCardCount; i++) {
        console.log("Loop Entered");
        const OrderIDS = await AllOrderCards.nth(i).locator("th").textContent();
        if (OrderId.includes(OrderIDS)) {
            await AllOrderCards.nth(i).locator("button").first().click();
            console.log("Loop executed and exit")
            break;
        }
    }

    const orderdetails = await page.locator("div .col-text ").textContent();
    expect(OrderId.includes(orderdetails)).toBeTruthy();


});