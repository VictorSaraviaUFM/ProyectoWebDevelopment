import express from 'express';
import Comment from '../models/Comment.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/comments - Obtener todos los comentarios principales (no respuestas)
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find({ 
      isReply: false 
    })
      .populate('playerId', 'name')
      .populate('teamId', 'name')
      .populate({
        path: 'replies',
        populate: {
          path: 'playerId teamId',
          select: 'name'
        },
        options: { sort: { createdAt: 1 } }
      })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/comments/:id/replies - Obtener respuestas de un comentario específico
router.get('/:id/replies', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate({
        path: 'replies',
        populate: {
          path: 'playerId teamId',
          select: 'name'
        },
        options: { sort: { createdAt: 1 } }
      });
    
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    res.json(comment.replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/comments - Crear nuevo comentario (puede ser principal o respuesta)
router.post('/', async (req, res) => {
  try {
    const { user, content, playerId, teamId, parentComment } = req.body;
    
    const commentData = {
      user,
      content,
      playerId,
      teamId,
      isReply: !!parentComment, // Si tiene parentComment, es una respuesta
      parentComment: parentComment || null
    };

    const comment = new Comment(commentData);
    const savedComment = await comment.save();
    
    // Si es una respuesta, actualizar el comentario padre
    if (parentComment) {
      await Comment.findByIdAndUpdate(parentComment, {
        $push: { replies: savedComment._id },
        $inc: { replyCount: 1 }
      });
    }

    // Populate para devolver datos completos
    await savedComment.populate('playerId', 'name');
    await savedComment.populate('teamId', 'name');
    
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/comments/:id - Eliminar comentario y sus respuestas
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    // Si tiene respuestas, eliminarlas también
    if (comment.replies.length > 0) {
      await Comment.deleteMany({ _id: { $in: comment.replies } });
    }

    // Si es una respuesta, actualizar el comentario padre
    if (comment.parentComment) {
      await Comment.findByIdAndUpdate(comment.parentComment, {
        $pull: { replies: comment._id },
        $inc: { replyCount: -1 }
      });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Comentario y respuestas eliminados' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/comments/:id/like - Dar like a un comentario
router.put('/:id/like', async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    
    res.json({ likes: comment.likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;