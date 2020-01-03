const Sequelize = require('sequelize');

// Database connection
const sequelize = new Sequelize('controle', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
module.exports =  sequelize
 