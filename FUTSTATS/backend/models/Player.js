import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String, required: true },
  position: { type: String, required: true },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  matches: { type: Number, default: 0 },
  rating: { type: Number, min: 0, max: 10 },
  nationality: String,
  image: String
}, { timestamps: true });

export default mongoose.model('Player', playerSchema);