const express = require("express");
const app = express();
//TO SERVE STATIC FILES
app.use(express.static(__dirname + '/uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));
const fs = require('fs');
const server = require("http").createServer(app);
const router = express.Router();
require("dotenv").config();
const debug = require('debug')('debug');
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
//require('./routes/api')(app, {}); //SIMPLE ROUTE
const userRoutes = require('./routes/api')(router, {});
app.use('/v1', userRoutes);
let port = process.env.ServerPort || 3001;
server.listen(port, () => {
  console.log("NodeStarted", port);
});
