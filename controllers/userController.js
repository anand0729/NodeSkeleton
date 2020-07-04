var userAPIs = require("../api/user");
 class userController extends userAPIs {
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
                case 'addBusinessInfo':
                    return this.addBusinessInfo(this.requestBody);
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

 module.exports = userController;