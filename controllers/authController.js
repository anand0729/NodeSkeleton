var authAPis = require("../api/auth");
 class authController extends authAPis {
     constructor(req) {  
         super(req);       
         this.action = '';
         this.requestParams = req.params;
         this.requestBody = req.body;
         this.header = req.headers;
     }

     doPostAction() {
        
        this.action = this.requestParams.action;
        try {
            switch (this.action) {
                case 'login':
                    return this.login(this.requestBody);
                case 'register':
                    return this.register(this.requestBody);
                default:
                    var response = {
                        status: 404,
                        msg: "Invalid Request"
                    }
                    return Promise.reject(response);
                     
            }
        } catch (error) {
            console.log("######CONTROLLER POST ERRROR####")
            var response = {
                status: 404,
                msg: "Invalid Request",
                error: error
            }
            return Promise.reject(response);
        }
        
        
    }

    doGetAction() {
        
        this.action = this.requestParams.action;
        try {
            switch (this.action) {
                case 'tokenRegenerate':
                    return this.tokenRegenerate(this.header);
                default:
                    var response = {
                        status: 404,
                        msg: "Invalid Request"
                    }
                    return Promise.reject(response);
                     
            }
        } catch (error) {
            console.log("######CONTROLLER GET ERRROR####")
            var response = {
                status: 404,
                msg: "Invalid Request",
                error: error
            }
            return Promise.reject(response);
        }
        
        
    }
 }

 module.exports = authController;