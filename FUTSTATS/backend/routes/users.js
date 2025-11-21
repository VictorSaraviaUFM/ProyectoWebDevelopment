import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// PUT /api/users/profile - Actualizar perfil
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, bio, avatar },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// POST /api/users/favorites/player - Agregar jugador favorito
router.post('/favorites/player/:playerId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { favoritePlayers: req.params.playerId } },
      { new: true }
    ).populate('favoritePlayers', 'name team position');

    res.json(user.favoritePlayers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/users/favorites/player/:playerId - Eliminar jugador favorito
router.delete('/favorites/player/:playerId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favoritePlayers: req.params.playerId } },
      { new: true }
    ).populate('favoritePlayers', 'name team position');

    res.json(user.favoritePlayers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;