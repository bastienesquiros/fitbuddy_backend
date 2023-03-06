import mongoose, { Schema } from 'mongoose';

interface IEvent {
  author: string;
  sport: string;
  date: string;
  address: string;
  totalPlayers: string;
  description: string;
  players: string;
}

const EventSchema: Schema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  sport: { type: String },
  date: { type: Date },
  address: { type: String },
  totalPlayers: { type: Number },
  description: { type: String },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

export default mongoose.model<IEvent>('events', EventSchema);
