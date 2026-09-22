const { test, expect } = require('@playwright/test');

test('@Web Browser Context test', async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();

   //await page.route('**/*.{jpg,png,jpeg}',route=>route.abort());// this will stop urls with extensions to hit in network tab, 
   //simply these url calls doesn't hit
   const userName = page.locator('#username');
   const passWord = page.locator('[type="password"]');
   const signIn = page.locator('#signInBtn');
   const cardTitles = page.locator(".card-body .card-title ")
    page.on('request',request=>console.log(request.url()));// this will print all the request urls hitting in networktab for page
   page.on('response',response=> console.log(response.url(),response.status()));
  // 14 lines gives all responses with status codes in network tab for page.
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   await userName.fill("rahulshettyacademy");
   await passWord.fill("Learning@830$3mK2");
   await signIn.click(); // after signin,  page loads and then content appears, textcontent auto waits, but alltextcontents no autowait
   //refer official page for autowaiting (what all methods autowaits)
   //console.log(await page.locator("[style*='block']").textContent()); textconetnt returns text for given locator
   //await expect(page.locator("[style*='block']")).toContainText('Incorrect'); assertion to check text contains Incorrect word 
   //await userName.fill("");// if any value already exists it fills with empty space.
   console.log(await cardTitles.first().textContent());// out of 4 , 1 st one then text conent
   console.log(await cardTitles.nth(1).textContent());// here nth(index) if it gives 4 locators as array matching , we are saying give me the 0th index , first one
   const allTitles = await cardTitles.allTextContents();// returns all text contents for all locators.
   console.log(allTitles);
});

test('Open Page ', async ({ page }) => {
   //const context = await browser.newContext();
   //const page = await context.newPage();
   await page.goto("https://www.google.com/");
   console.log(await page.title());
   await expect(page).toHaveTitle("Google");
});


test('Static Dropdowns Radio Buttons Check Box', async function ({ page }) {
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const userName = page.locator('#username');
   const passWord = page.locator('[type="password"]');
   const signIn = page.locator('#signInBtn');
   const docLink = page.locator("[href*= 'documents-request']");
   const dropdwon = page.locator('select.form-control');
   await dropdwon.selectOption('Teacher');
   //await page.pause(); pauses  page
   await page.locator('.radiotextsty').last().click();// selects the last element if multiple  are there.
   await page.locator('#okayBtn').click();
   console.log(await page.locator('.radiotextsty').last().isChecked());// is it checked ? returns true or false.
   await expect(page.locator('.radiotextsty').last()).toBeChecked();// assertion to check  radio button checked , pass only if checked,
   //47 line here main action is to be checked is performed outside so await outside.
   await page.locator('#terms').click();
   await expect(page.locator('#terms')).toBeChecked();
   await page.locator('#terms').uncheck();
   expect(await page.locator('#terms').isChecked()).toBeFalsy();
   // await should be written before the main action, here ischecked is action so await inside 
   //no assertion for uncheck , so we wrote custom assertion,locator is checked returns true/false. expect(true/false)toBetruthy/fasly.
   await expect(docLink).toHaveAttribute('class', 'blinkingText');
});

test('Child Window New Page', async function ({ browser }) {
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const DocLink = page.locator("[href*= 'documents-request']");

   //const [event1return, event2return,...] = Promise.all([event1,event2,...]) 
   // promise.all exceutes  both events parallelly until they are fulfilled and returns 
   //before clicking only we have to say new event(page) is going to happen on this context context.waitForEvent('page')

   const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      DocLink.click(),
   ]);

   const newpagetext = await newPage.locator('p.red').textContent();
   const textarray = newpagetext.split('@');
   const domain = textarray[1].split(" ")[0];
   await page.locator('#username').fill(domain);
   console.log(await page.locator('#username').inputValue());// inputValue() extracts any value in the userinput fields.
});


