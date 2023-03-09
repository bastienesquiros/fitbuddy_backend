import mongoose, { Schema } from 'mongoose';

export interface IEvent extends Document {
  _id: string;
  author: [string];
  sport: string;
  date: string;
  address: [number];
  totalPlayers: string;
  description: string;
  players: string;
}

const EventSchema: Schema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  sport: { type: String },
  date: { type: Date },
  address: { type: [Number] },
  totalPlayers: { type: Number },
  description: { type: String },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
});

export default mongoose.model<IEvent>('events', EventSchema);
