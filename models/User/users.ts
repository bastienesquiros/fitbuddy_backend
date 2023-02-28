import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './IUser';

const userSportsSchema: Schema = new Schema({
  sport: { type: String },
  level: { type: String },
});

const UserSchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  pseudo: { type: String },
  avatar: { type: String },
  birthday: { type: Date },
  gender: { type: String },
  bio: { type: String },
  email: { type: String },
  password: { type: String },
  token: { type: String },
  inscriptionDate: { type: Date },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  userSports: { type: [userSportsSchema] },
});

export default mongoose.model<IUser>('users', UserSchema);
