# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> New Website Login
- Location: tests\ClientApp.spec.js:21:6

# Error details

```
ReferenceError: products is not defined
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e3]:
    - navigation [ref=e5]:
      - generic [ref=e7]:
        - link "Automation Automation Practice":
          - /url: ""
          - generic [ref=e8] [cursor=pointer]:
            - heading "Automation" [level=3] [ref=e9]
            - paragraph [ref=e10]: Automation Practice
      - text: 
      - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
        - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
      - list [ref=e12]:
        - listitem [ref=e13] [cursor=pointer]:
          - button " HOME" [ref=e14]:
            - generic [ref=e15]: 
            - text: HOME
        - listitem
        - listitem [ref=e16] [cursor=pointer]:
          - button " ORDERS" [ref=e17]:
            - generic [ref=e18]: 
            - text: ORDERS
        - listitem [ref=e19] [cursor=pointer]:
          - button " Cart" [ref=e20]:
            - generic [ref=e21]: 
            - text: Cart
        - listitem [ref=e22] [cursor=pointer]:
          - button "Sign Out" [ref=e23]:
            - generic [ref=e24]: 
            - text: Sign Out
    - text:    
    - generic [ref=e25]:
      - paragraph [ref=e26]: Home | Search
      - heading "Filters" [level=4] [ref=e28]
      - generic [ref=e29]:
        - textbox "search" [ref=e31]
        - generic [ref=e32]:
          - heading "Price Range" [level=6] [ref=e33]
          - generic [ref=e34]:
            - textbox "Min Price" [ref=e36]
            - textbox "Max Price" [ref=e38]
        - generic [ref=e39]:
          - heading "Categories" [level=6] [ref=e40]
          - generic [ref=e41]: 
          - generic [ref=e43]:
            - checkbox [ref=e44]
            - generic [ref=e45]: fashion
          - generic [ref=e46]:
            - checkbox [ref=e47]
            - generic [ref=e48]: electronics
          - generic [ref=e49]:
            - checkbox [ref=e50]
            - generic [ref=e51]: household
        - generic [ref=e52]:
          - heading "Sub Categories" [level=6] [ref=e53]
          - generic [ref=e54]: 
          - generic [ref=e56]:
            - checkbox [ref=e57]
            - generic [ref=e58]: t-shirts
          - generic [ref=e59]:
            - checkbox [ref=e60]
            - generic [ref=e61]: shirts
          - generic [ref=e62]:
            - checkbox [ref=e63]
            - generic [ref=e64]: shoes
          - generic [ref=e65]:
            - checkbox [ref=e66]
            - generic [ref=e67]: mobiles
          - generic [ref=e68]:
            - checkbox [ref=e69]
            - generic [ref=e70]: laptops
        - generic [ref=e71]:
          - heading "Search For" [level=6] [ref=e72]
          - generic [ref=e73]: 
          - generic [ref=e75]:
            - checkbox [ref=e76]
            - generic [ref=e77]: men
          - generic [ref=e78]:
            - checkbox [ref=e79]
            - generic [ref=e80]: women
    - generic [ref=e81]:
      - generic [ref=e82]:
        - generic [ref=e83]:
          - generic [ref=e84]: Showing 3 results |
          - generic [ref=e85]: User can only see maximum 9 products on a page
        - generic [ref=e86]:
          - generic [ref=e90]:
            - heading "ADIDAS ORIGINAL" [level=5] [ref=e91]
            - generic [ref=e92]: $ 11500
            - button "View" [ref=e94] [cursor=pointer]:
              - generic [ref=e95]: 
              - text: View
            - button " Add To Cart" [ref=e96] [cursor=pointer]:
              - generic [ref=e97]: 
              - text: Add To Cart
          - generic [ref=e101]:
            - heading "ZARA COAT 3" [level=5] [ref=e102]
            - generic [ref=e103]: $ 11500
            - button "View" [ref=e105] [cursor=pointer]:
              - generic [ref=e106]: 
              - text: View
            - button " Add To Cart" [ref=e107] [cursor=pointer]:
              - generic [ref=e108]: 
              - text: Add To Cart
          - generic [ref=e112]:
            - heading "iphone 13 pro" [level=5] [ref=e113]
            - generic [ref=e114]: $ 55000
            - button "View" [ref=e116] [cursor=pointer]:
              - generic [ref=e117]: 
              - text: View
            - button " Add To Cart" [ref=e118] [cursor=pointer]:
              - generic [ref=e119]: 
              - text: Add To Cart
      - list "Pagination" [ref=e124]:
        - listitem [ref=e125]:
          - text: «
          - generic [ref=e126]:
            - text: Previous
            - generic [ref=e127]: page
        - listitem [ref=e128]:
          - generic [ref=e129]: You're on page
          - text: "1"
        - listitem [ref=e130]:
          - generic [ref=e131]:
            - text: Next
            - generic [ref=e132]: page
          - text: »
    - generic [ref=e133]: Design and Developed By - Kunal Sharma
  - generic "Login Successfully" [ref=e135]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | 
  3   | /*Test case : client app login, then find (user gives productname) then add that product to cart 
  4   |  and click cart verify product added correctly 
  5   | checkout and type in dynamic dropdown, and select  option , verify greyout email id with loginmail id
  6   | Enter all madatory details and click place order ,verify thankyou for the order and extract the orderid and save in variable 
  7   | click view order history page, search our orderid and click that orders view button(identify common card , then card locate orderid 
  8   | orderid.textcontent= orderid, then same card click view */
  9   | 
  10  | 
  11  | /*Handling dynamic dropdown -  if we type then only realted serach results come as dropdown.
  12  | //fisrt locate search where to type and (type is depricated, fill is like ctrl+v paste the text )
  13  | // we have to type one by one , apply pressSequentially , then dynamic dropdown appears
  14  | // locate dynamic dropdown and waitfor dynamic dropdown to fullyload
  15  | //locate options within dynamic dropdwon. generally locator common for all options in dynamic dropdown.
  16  | //now run for loop by counting options in dropdown and extract textcontent one by one , if text matches our value 
  17  | //then click that option only.*/
  18  | 
  19  | 
  20  | 
  21  | test('New Website Login', async function ({ page }) {
  22  |   const productName = 'ZARA COAT 3';
  23  |   const email = 'narindi007@gmail.com';
  24  |   await page.goto("https://rahulshettyacademy.com/client");
  25  |   await page.locator('#userEmail').fill(email);
  26  |   await page.locator('#userPassword').fill("Loginpass#7");
  27  |   await page.locator('#login').click();
  28  |   //await page.waitForLoadState("networkidle");// waits until all network calls made in the network tab.
  29  |   await page.locator('.card-body b').first().waitFor();// wait for method works for single element, page waits untill elememt/locator loads.
  30  |   const Titles = await page.locator('.card-body b').allTextContents();
  31  |   //console.log(Titles);
> 32  |   const count = await products.count();
      |                 ^ ReferenceError: products is not defined
  33  | 
  34  |   for (let i = 0; i < count; i++) {
  35  |     if (await products.nth(i).locator('b').textContent() === productName) {
  36  |       await products.nth(i).locator("text=' Add To Cart'").click();
  37  |       break;
  38  |     }
  39  |   }
  40  | 
  41  |   await page.locator('[routerlink="/dashboard/cart"]').click();
  42  |   await page.locator('div li').first().waitFor();
  43  |   // so after clicking cart pick any elememt and wait for elemnt
  44  |   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  45  |   // to check product name is visible(true/false),but isvisible autowait not supporting,
  46  |   // so after clicking cart pick any elememt and wait for elemnt
  47  |   expect(bool).toBeTruthy();
  48  | 
  49  |   await page.locator('button[type="button"]').nth(1).click();
  50  |   /*Handling Dynamic Dropdown 51 to 61*/
  51  |   await page.locator("[placeholder= 'Select Country']").pressSequentially('ind');
  52  |   const dynamicdropdown = page.locator(".ta-results").nth(0);
  53  |   await dynamicdropdown.waitFor();
  54  |   const dropdownoptions = await dynamicdropdown.locator("button");
  55  |   const optionscount = await dropdownoptions.count();
  56  |   for (let i = 0; i < optionscount; i++) {
  57  |     let optiontext = await dropdownoptions.nth(i).textContent();
  58  |     if (optiontext === " India") {
  59  |       await dropdownoptions.nth(i).click();
  60  |       break;
  61  |     }
  62  |   }
  63  | 
  64  |   await page.locator(".field [type='text']").first().fill("12345098761112");
  65  |   await page.locator(".field select").first().selectOption("07");
  66  |   await page.locator(".field select").last().selectOption("07");
  67  |   await page.locator(".field input").nth(1).fill("3457");
  68  |   await page.locator(".field input").nth(2).fill("Venkatesh");
  69  | 
  70  |   await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
  71  |   await page.locator(".action__submit").click();
  72  |   //await page.pause();
  73  |   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  74  |   const OrderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  75  |   console.log(OrderId);
  76  | 
  77  |   await page.locator(".em-spacer-1 [routerlink*='myorders']").click();
  78  | 
  79  |   await page.locator("tbody").waitFor();
  80  |   await page.locator("tbody tr").last().waitFor();
  81  |   const AllOrderCards = await page.locator("tbody tr");
  82  |   console.log("cards scanned");
  83  |   const AllOrderCardCount = await AllOrderCards.count();
  84  |   console.log(AllOrderCardCount);
  85  | 
  86  |   for (let i = 0; i < AllOrderCardCount; i++) {
  87  |     console.log("Loop Entered");
  88  |     const OrderIDS = await AllOrderCards.nth(i).locator("th").textContent();
  89  |     if (OrderId.includes(OrderIDS)) {
  90  |       await AllOrderCards.nth(i).locator("button").first().click();
  91  |       console.log("Loop executed and exit")
  92  |       break;
  93  |     }
  94  |   }
  95  | 
  96  |   const orderdetails = await page.locator("div .col-text ").textContent();
  97  |   expect(OrderId.includes(orderdetails)).toBeTruthy();
  98  | 
  99  | 
  100 | });
```