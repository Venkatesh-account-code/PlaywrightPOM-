const { test, expect } = require("@playwright/test");

test("Special Locators", async function ({ page }) {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    // page locates  label tags which has text Check me out if you Love IceCreams!
    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Loginpass#7");
    //page locates placeholder with value password and fills password 
    await page.getByRole("button", { name: 'Submit' }).click();
    // page locates button , then which button ,  button with name Submit
    await page.getByText(" The Form has been submitted successfully!.").isVisible();
    //page locates which has text The Form has been submitted successfully!

    await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible({ timeout: 1000 });
    // 5 secs wait default for all expect assertions, providing {timeout:10_000} this applies for only this step assertion.
    // Steplevel Assertion timeout 
    await page.getByRole("link", { name: 'Shop' }).click();

    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click();
    //app card gives 4 ,out of 4 filter method filters which has text Nokia(3rd card) , in that getbyrole button clicks
    // this example is same as client app ,  which is select product based on text and add that product to cart

});

test("Special Locators Assertion Timeout Test level ", async function ({ page }) {

    test.setTimeout(6000);// Test level test timeout for only this test case total time
    const slowExpect = expect.configure({ timeout: 9000 });//slow expect is Test Level Assertion timeout for only this testcase 
    page.setDefaultTimeout(9000); //test level Action Timeout , all actions time only in this test case
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").click();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Loginpass#7");

    await page.getByRole("button", { name: 'Submit' }).click();

    await page.getByText(" The Form has been submitted successfully!.").isVisible();


    await slowExpect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible();

    await page.getByRole("link", { name: 'Shop' }).click();

    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop");
    // for this entire test case we use slowexpect, slow expect is custom assertion timeout for only this testcase 

    await page.locator("app-card").filter({ hasText: 'Nokia Edge' }).getByRole("button").click({ timeout: 2000 });
    // Step level Action Timeout means for only this click takes time mentioned 


});