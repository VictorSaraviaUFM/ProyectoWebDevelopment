import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  user: { type: String, required: true },
  content: { type: String, required: true },
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', commentSchema);