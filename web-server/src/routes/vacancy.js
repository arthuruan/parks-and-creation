const express = require('express');
const router = express.Router();
const Vacancy = require('../models/vacancy');

// Rota para listar todas as vagas
router.get('/', async (req, res) => {
  const vacancies = await Vacancy.findAll();
  res.json(vacancies);
});

// Rota para criar uma nova vaga
router.post('/', async (req, res) => {
  const { coordinates, sectorId, status } = req.body;
  const vacancy = await Vacancy.create({ coordinates, sectorId, status });
  res.status(201).json(vacancy);
});

// Rota para atualizar uma vaga
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { coordinates, sectorId, status } = req.body;
  const vacancy = await Vacancy.findByPk(id);

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