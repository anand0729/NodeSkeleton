const Sequelize = require('sequelize');

const Mode = process.env.EnvModeProd; 
var host = '';
var username = '';
var password = '';
var database = '';
if(Mode==0)
{ 
  host = process.env.devHost;
  database = process.env.devDB; 
  username = process.env.devDbUsername;
  password = process.env.devDbPassword;  
} else {
  host = process.env.prodHost;
  database = process.env.prodDB;
  username = process.env.prodDBUsername;
  password = process.env.prodDBPassword;
}
const db = {};
const sequelize = new Sequelize(database, username, password, { 
  host: host,
  dialect: 'mysql'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize; 

module.exports = db;
