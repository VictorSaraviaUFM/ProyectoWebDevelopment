import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET /api/comments - Obtener todos los comentarios
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('playerId', 'name')
      .populate('teamId', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/comments - Crear nuevo comentario
router.post('/', async (req, res) => {
  try {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    
    // Populate para devolver datos completos
    await savedComment.populate('playerId', 'name');
    await savedComment.populate('teamId', 'name');
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/comments/:id - Eliminar comentario
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.json({ message: 'Comentario eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;