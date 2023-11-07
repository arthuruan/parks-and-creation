const { DataTypes } = require('sequelize');
const sequelize = require('../db');
// const Vacancy = require('./vacancy');

const VacancyHistory = sequelize.define('VacancyHistory', {
  vacancy_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
  },
});

// Relacionamento com a tabela 'vacancy'
// VacancyHistory.belongsTo(Vacancy, { foreignKey: 'vacancy_id' });

module.exports = VacancyHistory;