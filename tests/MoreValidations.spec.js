const { test, expect } = require('@playwright/test');

//test.describe.configure({mode:'parallel'});// this make all test cases below run in parallel
//test.describe.configure({mode:'serial'});// by default tests will run one by one ,
//  but if we write this if test2 depends on test1, if test1 fails it will skip remaining tests 2and 3
test("Popup IFrames ", async function ({ page }) {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  // await page.goto("https://google.com");
  // await page.goBack();// page navigates back ( next page <-)
  // await page.goForward();// page navigates forward(previous page ->)

  await expect(page.locator("#displayed-text")).toBeVisible();//checks and pass if element visible
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();//checks and pass if elemnt is hidden

  await page.locator("#confirmbtn").click();
  // alert/popups/dialogs these are java/javascript,we cant identify xpath/css, 
  // we cant do any action on page unless we click ok or cancel
  //  so here we are informing page that on page a dialog appears, 

  await page.on('dialog', dialog => dialog.accept());// clicks ok whenever it finds
  //await page.on('dialog', dialog => dialog.dismiss());//clicks cancel

  await page.locator("#mousehover").hover();// will  do mousehover on element

  const IFramepage = page.frameLocator("[name='iframe-name']");//Locate the Iframe using framelocator method
  // provide loactor of iframe in framelocator , we can identify iframes with tagnames (iframes/frameset)
  await IFramepage.locator("li [href*='lifetime-access']:visible").click();
  //this locates 2 elements one is hideden and one is visible, so to click visible 
  const textcheck = await IFramepage.locator(".text h2").textContent();
  console.log(textcheck.split(' ')[1]);

});

test("Screenshots", async({ page })=> {

  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#displayed-text").screenshot({path:'Element Screenshot'});//takes the element screenshot
  await page.locator("#hide-textbox").click();
  await page.screenshot({path:'Screenshot.png'});// takes the page screenshot
  await expect(page.locator("#displayed-text")).toBeHidden();

 
});

test("Visual Testing ", async({ page })=> {

  await page.goto("https://google.com");
  expect(await page.screenshot()).toMatchSnapshot('Landing.png');
  // here page.screenshot takes screenshot , to match landingpng not there,so 1st screenshot will be saved as landingpng 
  // if we run test 2nd time now page takes screnshot and matches with landing.png and comapres everything in detail .
  //test passes if all r same 

 
});