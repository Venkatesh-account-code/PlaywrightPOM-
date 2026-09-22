// @ts-check

const { devices } = require("@playwright/test");
const { on } = require("node:cluster");


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries:1,// if testcase fails reruns for 1 time
  workers:3,// by default 5spec.js test files runs in parallel 
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',

  projects: [
    
    {
      name: 'safari',
      use: {
        browserName: 'Webkit',
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure',
        ...devices['iPhone 11']// opens browser like iphone11 
      }
    },

      {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        video:'retain-on-failure',
        trace: 'retain-on-failure',
        permissions:['geolocation'],// allow google access location
        ignoreHttpsErrors:true,// if ssl not there ,  clicks advance and proceed so that web app opens
       //viewport: {width:720,height:720}//opens browser with these dimensions
         //...devices['Galaxy Note 3']// opens like Galaxy note3mobile

      },

    

    },

    


  ]


});

module.exports = config;