import express from 'express';
import Player from '../models/Player.js';

const router = express.Router();

// GET /api/players - Obtener todos los jugadores
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().sort({ goals: -1 });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/players/:id - Obtener jugador por ID
router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/players - Crear nuevo jugador
router.post('/', async (req, res) => {
  try {
    const player = new Player(req.body);
    const savedPlayer = await player.save();
    res.status(201).json(savedPlayer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;