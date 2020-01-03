const Sequelize = require('sequelize');

// Database connection
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });
module.exports =  sequelize
 