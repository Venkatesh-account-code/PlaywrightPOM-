class APIUtils{

    constructor(APIContext,Loginpayload)
    {
        this.APIContext = APIContext;
        this.Loginpayload = Loginpayload;
    }

    async getToken(){
        const LoginResponse = await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {data:this.Loginpayload});
        // apicontext.post to hit post method , with url and data:Loginpayload, so after hitting we get response 
        //apicontext.post returns  LoginResponse
         //await expect(LoginResponse.ok()).toBeTruthy();// loginresponse.ok checks with 200 status codes if response includes 200 ,then true
           //its like expect(true ).tobetruthy
           const LoginResponseJson = await LoginResponse.json();//converts response into json
           const token = LoginResponseJson.token;// now its like jsobj, obj.key, spo Response contains token key. 
           // LoginResponseJson.token we get token
           console.log(token);

           return token;

    }
    
    //Placing order with API, so post url now it has data and headers
    async CreateOrder(Orderpayload){
        let response = {};
        response.token = await this.getToken();
    const OrderResponse = await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", 
    {
    data:Orderpayload,
    headers:{
        'Authorization': response.token,
        'Content-Type': 'application/json',
    },

    });

    const OrderResponseJson = await OrderResponse.json();
    console.log(OrderResponseJson);
    const OrderIdByAPI = OrderResponseJson.orders[0];
    response.OrderIdByAPI = OrderIdByAPI;

    return response;

    }

}

module.exports = {APIUtils};