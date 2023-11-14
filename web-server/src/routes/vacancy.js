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
router.get('/:name', async (req, res) => {
  const { name } = req.params;

  const vacancy = await Vacancy.findOne({ where: {name} });
  res.json(vacancy);
});

// Rota para recuperar historico da vaga
router.get('/:name/history', async (req, res) => {
  const { name } = req.params;

  const vacancy = await Vacancy.findOne({ where: {name} });
  if (!vacancy) {
    return res.status(409).json({ error: 'Vaga não existe' });
  }

  const history = await VacancyHistory.findAll({ vacancy_id: vacancy.id });
  res.json(history);
});

// Rota para criar uma nova vaga
router.post('/', async (req, res) => {
  const { coordinates, sectorId, status, mean, name} = req.body;

  try {
    const exists = await Vacancy.findOne({ where: {name} });
    if (exists) {
      console.log('Vaga com esse nome já existe');
      return res.status(409).json({ error: 'Vaga com esse nome já existe' });
    }

    const vacancy = await Vacancy.create({ coordinates, sector_id: sectorId, status, mean, name });
    await VacancyHistory.create({vacancy_id: vacancy.id, status});
    res.status(201).json(vacancy);
  } catch (e) {
    res.status(500).json(e);
  }
});

// // Rota para criar uma nova vaga
// router.post('/', async (req, res) => {
//   const { coordinates, sectorId, status } = req.body;

//   const vacancy = await Vacancy.create({ coordinates, sectorId, status });
//   await VacancyHistory.create({vacancy_id: vacancy.id, status});
//   res.status(201).json(vacancy);
// });

// Rota para criar uma nova vaga
router.post('/multiples', async (req, res) => {
  const { sectorId, vacancies } = req.body;
  const created = [];
 

  try {
    await Promise.all(vacancies.map( async (vac) => {
      const { coordinates, status, name , mean} = vac;

      const exists = await Vacancy.findOne({ where: {name} });
      if (exists) {
        console.log('Vaga com esse nome já existe');
        return res.status(409).json({ error: 'Vaga com esse nome já existe' });
      }
      const vacancy = await Vacancy.create({ coordinates, sector_id: sectorId, status, mean, name });
      await VacancyHistory.create({vacancy_id: vacancy.id, status});
      created.push(vacancy);
    }))

    res.status(201).json(created);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
});

// Rota para atualizar uma vaga
router.patch('/:name', async (req, res) => {
  const { name } = req.params;
  const { coordinates, sectorId, status, mean } = req.body;
  let vacancy = {};

  try {
    vacancy = await Vacancy.findOne({ where: {name} });
    if (status) await VacancyHistory.create({vacancy_id: id, status});
    if (!vacancy) {
      return res.status(404).json({ error: 'Vaga não encontrada' });
    }
  
    if (coordinates) vacancy.coordinates = coordinates;
    if (sectorId) vacancy.sector_id = sectorId;
    if (status) vacancy.status = status;
    if (mean) vacancy.mean = mean;
  
    await vacancy.save();
  } catch (error) {
    res.status(404).json(error);
  }

  res.json(vacancy);
});

// Rota para atualizar uma vaga
router.patch('/update/multiples', async (req, res) => {
  const { vacancies } = req.body;
  let updated = [];

  try {

    await Promise.all(vacancies.map(async (vac) => {
      const { name, coordinates, sectorId, status } = vac;

      const vacancy = await Vacancy.findOne({ where: {name} });
      if (status) await VacancyHistory.create({vacancy_id: id, status});
      if (!vacancy) {
        return res.status(404).json({ error: 'Vaga não encontrada' });
      }

      if (coordinates) vacancy.coordinates = coordinates;
      if (sectorId) vacancy.sector_id = sectorId;
      if (status) vacancy.status = status;
      if (mean) vacancy.mean = mean;
    
      await vacancy.save();
      updated.push(vacancy);
    }));

  } catch (error) {
    res.status(404).json(error);
  }

  res.json(updated);
});

// Rota para excluir uma vaga
router.delete('/:name', async (req, res) => {
  const { name } = req.params;
  const vacancy = await Vacancy.findOne({ where: {name} });

  if (!vacancy) {
    return res.status(404).json({ error: 'Vaga não encontrada' });
  }

  await vacancy.destroy();
  res.json({ message: 'Vaga excluída com sucesso' });
});

module.exports = router;