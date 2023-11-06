const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Vacancy = require('./vacancy');

const Sector = sequelize.define('Sector', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

// Relacionamento com a tabela 'vacancy'
Sector.hasMany(Vacancy, { as: 'vacancies', foreignKey: 'sector_id' });

module.exports = Sector;