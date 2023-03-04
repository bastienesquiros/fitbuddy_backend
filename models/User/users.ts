import mongoose, { Schema, Document, model } from 'mongoose';
import { IUser } from './IUser';

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  pseudo: { type: String },
  birthday: { type: Date },
  gender: { type: String },
  bio: { type: String },
  password: { type: String },
  token: { type: String },
  inscriptionDate: { type: Date },
  sport: { type: [String] },
});

const User = model<IUser>('User', UserSchema);

export default User;
