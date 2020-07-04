const express = require("express");
const app = express();
const server = require("http").createServer(app);
require("dotenv").config();


const db = require("./config/database");
require("./models");
const { sequelize } = require("./config/database"); 
sequelize
  .authenticate()
  .then(() => {
    db.sequelize.sync(force=> true).then(function () {  
      console.error("Database Connected");
     
    });
  })
  .catch((err) => console.error(err));


require("./middleware")(app);
//ROUTER 
require('./routes/api')(app, {});


 
let port = process.env.ServerPort || 3001;
server.listen(port, () => {
  console.log("NodeStarted", port);
});
