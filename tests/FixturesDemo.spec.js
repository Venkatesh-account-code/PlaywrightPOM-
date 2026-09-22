const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/Fixtures');

customtest("Fixtures Demo",async({authenticatedPage, createOrder,testDataforOrder })=>
{

// Testcase is to Login then place order and view and verify order in order history page.


    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
  await authenticatedPage.locator("[routerlink*='myorders']").click();
  await authenticatedPage.locator("tbody").waitFor();
await expect(authenticatedPage.getByText(createOrder.OrderIdByAPI)).toBeVisible();
console.log(testDataforOrder.productname);
});