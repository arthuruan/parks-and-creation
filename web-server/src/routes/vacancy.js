const express = require('express');
const router = express.Router();
const Vacancy = require('../models/vacancy');
const VacancyHistory = require('../models/vacancyHistory');

// Rota para listar todas as vagas
router.get('/', async (req, res) => {
  const vacancies = await Vacancy.findAll();
  res.json(vacancies);
});

// Rota para recuperar vaga
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const vacancy = await Vacancy.findByPk(id);
  res.json(vacancy);
});

// Rota para recuperar historico da vaga
router.get('/:id/history', async (req, res) => {
  const { id } = req.params;

  const history = await VacancyHistory.findAll({ vacancyId: id });
  res.json(history);
});

// Rota para criar uma nova vaga
router.post('/', async (req, res) => {
  const { coordinates, sectorId, status } = req.body;

  const vacancy = await Vacancy.create({ coordinates, sectorId, status });
  await VacancyHistory.create({vacancyId: vacancy.id, status});
  res.status(201).json(vacancy);
});

// Rota para atualizar uma vaga
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { coordinates, sectorId, status } = req.body;
  const vacancy = await Vacancy.findByPk(id);
  if (status) await VacancyHistory.create({vacancyId: id, status});
  if (!vacancy) {
    return res.status(404).json({ error: 'Vaga não encontrada' });
  }

  vacancy.coordinates = coordinates;
  vacancy.sectorId = sectorId;
  vacancy.status = status;
  await vacancy.save();

  res.json(vacancy);
});

// Rota para excluir uma vaga
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const vacancy = await Vacancy.findByPk(id);

  if (!vacancy) {
    return res.status(404).json({ error: 'Vaga não encontrada' });
  }

  await vacancy.destroy();
  res.json({ message: 'Vaga excluída com sucesso' });
});

module.exports = router;