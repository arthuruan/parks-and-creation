const { Sequelize } = require('sequelize');
const dbConfig = require('./config/database.json')

// Configure a conexão com o banco de dados
const sequelize = new Sequelize(dbConfig.development);

module.exports = sequelize;