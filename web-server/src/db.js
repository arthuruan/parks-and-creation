const { Sequelize } = require('sequelize');
const dbConfig = require('./config/db_config.json')

// Configure a conexão com o banco de dados
const sequelize = new Sequelize(dbConfig.development);

module.exports = sequelize;