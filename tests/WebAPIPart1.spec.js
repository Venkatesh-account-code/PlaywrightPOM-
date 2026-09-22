const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');
const Loginpayload = { userEmail: "narindi007@gmail.com", userPassword: "Loginpass#7" };
const Orderpayload = { orders: [{ country: "Algeria", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
//here we are getting this orderpayload in network tab , 
// if we want a product click  view buton of that product, in page url we get productOrderedId at last.

// Integrated api in web automation here.
//Client App same,we did login part using api and set token in browser localstorage , so now when page.goto(url)exceutes
//already login done so page diretly goes to page after login and continues the test case.

//before all executes once before all testcases
test.beforeAll(async () => {

  const APIContext = await request.newContext();//like browser context ui,  request context api
  const apiUtils = new APIUtils(APIContext, Loginpayload);

  response = await apiUtils.CreateOrder(Orderpayload);



});

//before each executes for every test case.
test.beforeEach(() => {


});


test('New Website Login', async function ({ page }) {



  await page.addInitScript(value => {
    window.localStorage.setItem("token", value)
  }, response.token);

  // here playwright can't add token with value in browser default,but it can execute script which we give addinitscript is javascript script
  // so we r saying have to add a value ,  so value is a function which takes window.localStorage.setItem("token",value) as function 
  //window.localStorage.setItem("token",value) now which value we give as next argument ,token  
  // executed testbefore all got token from gettoken method in apiutils class and add that token in browsr local storage with addinitscript
  // we can skip  ui login ,we login through api instead.

  await page.goto("https://rahulshettyacademy.com/client");

  await page.locator("[routerlink*='myorders']").click();

  await page.locator("tbody").waitFor();
  await page.locator("tbody tr").last().waitFor();
  const AllOrderCards = await page.locator("tbody tr");

  const AllOrderCardCount = await AllOrderCards.count();


  for (let i = 0; i < AllOrderCardCount; i++) {
    //console.log("Loop Entered");
    const OrderIDS = await AllOrderCards.nth(i).locator("th").textContent();
    if (response.OrderIdByAPI.includes(OrderIDS)) {
      await AllOrderCards.nth(i).locator("button").first().click();
      //console.log("Loop executed and exit")
      break;
    }
  }

  const orderdetails = await page.locator("div .col-text ").textContent();
  await page.pause();
  expect(response.OrderIdByAPI.includes(orderdetails)).toBeTruthy();
  // //Verify if order created is showing in history page
  // Precondition - create order we are doing by api and passing orderIdbyAPI to this testcase.

});