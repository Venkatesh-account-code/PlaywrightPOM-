const { test, expect } = require('@playwright/test');

/*Test case : client app login, then find (user gives productname) then add that product to cart 
 and click cart verify product added correctly 
checkout and type in dynamic dropdown, and select  option , verify greyout email id with loginmail id
Enter all madatory details and click place order ,verify thankyou for the order and extract the orderid and save in variable 
click view order history page, search our orderid and click that orders view button(identify common card , then card locate orderid 
orderid.textcontent= orderid, then same card click view */


/*Handling dynamic dropdown -  if we type then only realted serach results come as dropdown.
//fisrt locate search where to type and (type is depricated, fill is like ctrl+v paste the text )
// we have to type one by one , apply pressSequentially , then dynamic dropdown appears
// locate dynamic dropdown and waitfor dynamic dropdown to fullyload
//locate options within dynamic dropdwon. generally locator common for all options in dynamic dropdown.
//now run for loop by counting options in dropdown and extract textcontent one by one , if text matches our value 
//then click that option only.*/



test('Client App Login', async function ({page}) {
  const productName = 'ZARA COAT 3';
  const email = 'narindi007@gmail.com';
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator('#userEmail').fill(email);
  await page.locator('#userPassword').fill("Loginpass#7");
  await page.locator('#login').click();
  //await page.waitForLoadState("networkidle");// waits until all network calls made in the network tab.
  await page.locator('.card-body b').first().waitFor();// wait for method works for single element, page waits untill elememt/locator loads.
  const Titles = await page.locator('.card-body b').allTextContents();
  //console.log(Titles);
  const count = await products.count();

  for (let i = 0; i < count; i++) {
    if (await products.nth(i).locator('b').textContent() === productName) {
      await products.nth(i).locator("text=' Add To Cart'").click();
      break;
    }
  }

  await page.locator('[routerlink="/dashboard/cart"]').click();
  await page.locator('div li').first().waitFor();
  // so after clicking cart pick any elememt and wait for elemnt
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  // to check product name is visible(true/false),but isvisible autowait not supporting,
  // so after clicking cart pick any elememt and wait for elemnt
  expect(bool).toBeTruthy();

  await page.locator('button[type="button"]').nth(1).click();
  /*Handling Dynamic Dropdown 51 to 61*/
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
  //await page.pause();
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