// @ts-check

const { on } = require("node:cluster");


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout:30*1000,// Global level test timeout for all testcases ,Max time one test case runs,if not timeout error.
  expect:{
    timeout:5000,// global level assertion time, means for all test cases asssertions same wait, we can change if we want more.
  },
  reporter:'html',
  
  use: {
   
    //actionTimeout: 10 * 1000,// Global level max time for an action(eg: for click, fill,,,etc actions)
    //navigationTimeout: 30 * 1000,

    screenshot:'on',
    trace: 'retain-on-failure',//retain on failure( tarces for failed test cases), on(for all test cases), off (no trace)

    browserName:'chromium',
    headless: false
  },

  
});

module.exports = config;