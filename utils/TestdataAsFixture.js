const base = require('@playwright/test');

exports.customtest1 = base.test.extend({

    testdatafixture :{

    email: "narindi007@gmail.com",
    password:"Loginpass#7",
    productName :"ZARA COAT 3"

    }
})