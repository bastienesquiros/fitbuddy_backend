import mongoose, { Schema } from 'mongoose';
import { IEvent } from './IEvent';

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
