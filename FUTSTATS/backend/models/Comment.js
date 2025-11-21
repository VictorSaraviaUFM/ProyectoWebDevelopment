import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  likes: { type: Number, default: 0 },
  parentComment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }, // Para comentarios anidados
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Para almacenar respuestas
  replyCount: { type: Number, default: 0 }, // Contador de respuestas
  isReply: { type: Boolean, default: false }, // Si es una respuesta a otro comentario
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);