const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const Sector = require('./sector');
const VacancyHistory = require('./vacancyHistory');

const Vacancy = sequelize.define('Vacancy', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  coordinates: {
    type: DataTypes.STRING,
  },
  mean: {
    type: DataTypes.DOUBLE,
  },
  sector_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
});

// Relacionamento com a tabela 'vacancy_history'
Vacancy.hasMany(VacancyHistory, { as: 'histories', foreignKey: 'vacancy_id' });

module.exports = Vacancy;