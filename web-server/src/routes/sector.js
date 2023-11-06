const express = require('express');
const router = express.Router();
const Sector = require('../models/sector');

// Rota para listar todos os setores
router.get('/', async (req, res) => {
  const sectors = await Sector.findAll();
  res.json(sectors);
});

// Rota para criar um novo setor
router.post('/', async (req, res) => {
  const { name } = req.body;
  const sector = await Sector.create({ name });
  res.status(201).json(sector);
});

// Rota para atualizar um setor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const sector = await Sector.findByPk(id);

  if (!sector) {
    return res.status(404).json({ error: 'Setor não encontrado' });
  }

  sector.name = name;
  await sector.save();

  res.json(sector);
});

// Rota para excluir um setor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const sector = await Sector.findByPk(id);

  if (!sector) {
    return res.status(404).json({ error: 'Setor não encontrado' });
  }

  await sector.destroy();
  res.json({ message: 'Setor excluído com sucesso' });
});

module.exports = router;