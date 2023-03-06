import mongoose, { Schema } from 'mongoose';

export interface IEvent extends Document {
  author: [string];
  sport: string;
  date: string;
  address: [number];
  totalPlayers: string;
  description: string;
  players: string;
}

const EventSchema: Schema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sport: { type: String },
  date: { type: Date },
  address: { type: [Number] },
  totalPlayers: { type: Number },
  description: { type: String },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model<IEvent>('Event', EventSchema);
