const base = require('@playwright/test');
const {request } = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const Loginpayload = { userEmail: "narindi007@gmail.com", userPassword: "Loginpass#7" };
const Orderpayload = { orders: [{ country: "Algeria", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

exports.customtest = base.test.extend(
    {
        
        authenticatedPage: async ({ browser }, use) => {
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto("https://rahulshettyacademy.com/client");
            await page.locator('#userEmail').fill("narindi007@gmail.com");
            await page.locator('#userPassword').fill("Loginpass#7");
            await page.locator('#login').click();
            await page.waitForLoadState("networkidle");
            await use(page);// browser is needed for executing all code ,and use is for returning value to authenticatedPage
            await context.close();
        },

        
        createOrder: async ({ }, use) => {
            //setup
            const APIContext = await request.newContext();//like browser context ui,  request context api
            const apiUtils = new APIUtils(APIContext, Loginpayload);
            const response = await apiUtils.CreateOrder(Orderpayload);
            await use(response);
            // code after use is called teardown,  executes after test execution only
            await APIContext.dispose();
        },

        
        testDataforOrder : {

                productname : "ADIDAS ORIGINAL"
        }
    }
)
    

    


