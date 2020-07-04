'use strict';

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(__filename);
const db = require("../config/database");

fs
  .readdirSync(__dirname) 
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    //console.log(file);
    //const model = require(path.join(__dirname, file));
    var model = db.sequelize['import'](path.join(__dirname, file)); 
    //var model = db.sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});