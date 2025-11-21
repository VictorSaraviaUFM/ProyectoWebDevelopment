import express from 'express';
import Team from '../models/Team.js';

const router = express.Router();

// GET /api/teams - Obtener todos los equipos
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().sort({ points: -1 });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/teams/:id - Obtener equipo por ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Equipo no encontrado' });
    }
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;