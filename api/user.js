const db = require("./../config/database");
const businessType = db.business_type;
class userAPIs {
  getBusinessTypeList(data) {
    
    try {
      /* console.log(userInfo.data.id); */
      return businessType.findAll({
        where: {
          status:'a'
        },
        attributes: [
          "id",
          "name"          
        ]
      }).then((data) => {
       
        if (data != null) {
         
          var response = {
            status: 200,
            data: data,
          };
        } else {
          var response = {
            status: 401,
            msg: "List Not Found",
          };
        }
        console.log("##########");
        return Promise.resolve(response);
      });
       
     } catch (error) {
       
      let response = {
        status: 401,
        error: error,
      };
      return Promise.reject(response);
    } 
  }

  addBusinessInfo(data)
  {
    let resp  = {
      status : 200,
      data : data
    }
    return Promise.resolve(resp);
  }
}

module.exports = userAPIs;
