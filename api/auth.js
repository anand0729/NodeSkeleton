const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("./../config/database");
const User = db.user;
const Joi = require("@hapi/joi");
class authAPIs {
  login(data) {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required(),
    });

    const errorCheck = schema.validate(data);
    if (errorCheck.error) {
      let response = {
        status: 422,
        data: errorCheck.error,
      };
      return Promise.reject(response);
    }
    return User.findOne({
      where: {
        email: data.username,
        status: 'a',
      },
      attributes: ["id", "password"],
    }).then((result) => {
      if (result) {
        return this.checkPassword(result, data.password);
      } else {
        let response = {
          status: 401,
          data: "Invalid Credentials",
        };
        return Promise.reject(response);
      }
    });
  }

  checkPassword(result, password) {
    //try {

    if (bcrypt.compareSync(password, result.password)) {
      return User.findOne({
        where: {
          id: result.id,
        },
        attributes: [
          "id",
          "businessTypeId",
          "name",
          "companyName",
          "email",
          "newReg",
          "status",
          "type",
        ],
      }).then((data) => {
        if (data != null) {
          const token = jwt.sign(
            {
              data
            },
            process.env.TokenSecret,
            { expiresIn: 60 * 60 }
          );
          var response = {
            status: 200,
            token: token,
          };
        } else {
          var response = {
            status: 401,
            msg: "Invalid Credentials",
          };
        }
        return Promise.resolve(response);
      });
    } else {
      var response = {
        status: 401,
        msg: "Invalid Credentials",
      };
      return Promise.resolve(response);
    }
  }

  register(data) {
    const schema = Joi.object({
      businessTypeId:Joi.number().integer().required(),
      companyName: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().min(5).max(50).required(),
      password: Joi.string().min(5).max(30).required(),
    });

    const errorCheck = schema.validate(data);
    if (errorCheck.error) {
      let response = {
        status: 422,
        data: errorCheck.error,
      };
      return Promise.reject(response);
    }

    return User.findOne({
      where: {
        email: data.email,
      },
      attributes: ["id", "password", "status"],
    }).then((result) => {
      if (result) {
        let response = {
          status: 200,
          data: "User Already Registered!",
        };
        return Promise.resolve(response);
      } else {
        return User.create({
          businessTypeId:data.businessTypeId,
          companyName: data.companyName,
          name: data.name,
          email: data.email,
          password: bcrypt.hashSync(data.password, saltRounds),
        }).then((result) => {
          if (result) {
            var response = {
              status: 200,
              msg: "User Created!",
            };
            return Promise.resolve(response);
          } else {
            var response = {
              status: 400,
              msg: "Error Occured while Creating User",
              error: error,
            };
            return Promise.reject(response);
          }
        });
      }
    });
  } 

  tokenRegenerate(dataCame) {
    
    try {
      let userInfo = jwt.verify(dataCame.authorization.split(' ')[1], process.env.TokenSecret,{ignoreExpiration: true});  //, {ignoreExpiration: true}
      /* console.log(userInfo.data.id); */
      return User.findOne({
        where: {
          id: userInfo.data.id,
          status:'a'
        },
        attributes: [
          "id",
          "businessTypeId",
          "name",
          "companyName",
          "email",
          "newReg",
          "status",
          "type",
        ]
      }).then((data) => {
       
        if (data != null) {
         
          const token = jwt.sign({ data, }, process.env.TokenSecret, { expiresIn: 60 * 60 }  );
          var response = {
            status: 200,
            token: token,
          };
        } else {
          var response = {
            status: 401,
            msg: "Invalid User !",
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
}

module.exports = authAPIs;
