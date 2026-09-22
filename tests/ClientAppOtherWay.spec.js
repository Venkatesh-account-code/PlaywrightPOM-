const { test, expect } = require('@playwright/test');

//Client App Implement uisng Special Locators

test('New Website Login', async function ({ page }) {
  const productName = 'ZARA COAT 3';
  const email = 'narindi007@gmail.com';
  const products = await page.locator('.card-body');
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder('email@example.com').fill(email);
  await page.getByPlaceholder('enter your passsword').fill("Loginpass#7");
  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('.card-body b').first().waitFor();
  const Titles = await page.locator('.card-body b').allTextContents();
  const count = await products.count();


  await page.locator(".card-body").filter({ hasText: 'ZARA COAT 3' }).getByRole('button', { name: 'Add To Cart' }).click();
  // replaced 22 to 29 exection with line 20
  //    for(let i = 0;i < count; i++)
  //    {
  //       if(await products.nth(i).locator('b').textContent() === productName)
  //         {
  //         await products.nth(i).locator("text=' Add To Cart'").click();
  //         break;
  //         } 
  //    }

  await page.getByRole('listitem').getByRole('button', { name: 'Cart' }).click();
  await page.locator('div li').first().waitFor();

  await expect(page.getByText('ZARA COAT 3')).toBeVisible();


  await page.getByRole('button', { name: 'Checkout' }).click();
  /*Handling Dynamic Dropdown 51 to 61*/
  await page.getByPlaceholder("Select Country").pressSequentially('ind');
  await page.getByRole('button', { name: 'India' }).nth(1).click();
  // replaced 43 to 53 with line 40

  //   const dynamicdropdown =  page.locator(".ta-results").nth(0);
  //    await dynamicdropdown.waitFor();
  //    const dropdownoptions = await dynamicdropdown.locator("button");
  //    const optionscount = await dropdownoptions.count();
  //    for(let i=0;i<optionscount;i++){
  //      let optiontext = await dropdownoptions.nth(i).textContent();
  //      if(optiontext === " India"){
  //       await dropdownoptions.nth(i).click();
  //       break;
  //      }
  //    }

  await page.locator(".field [type='text']").first().fill("12345098761112");
  await page.locator(".field select").first().selectOption("07");
  await page.locator(".field select").last().selectOption("07");
  await page.locator(".field input").nth(1).fill("3457");
  await page.locator(".field input").nth(2).fill("Venkatesh");

  await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  await page.getByText("Place Order").click();
  await expect(page.getByText('Thankyou for the order.')).toBeVisible();

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