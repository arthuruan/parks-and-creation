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
  coordenates: {
    type: DataTypes.STRING,
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