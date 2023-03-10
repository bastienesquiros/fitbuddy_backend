import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  birthday: Date;
  gender: string;
  bio: string;
  email: string;
  password: string;
  token: string;
  inscriptionDate: Date;
  bookmarks: [string];
  myEvents: [string];
  sports: [string];
}

const UserSchema: Schema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  pseudo: { type: String },
  birthday: { type: Date },
  gender: { type: String },
  bio: { type: String },
  email: { type: String },
  password: { type: String },
  token: { type: String },
  inscriptionDate: { type: Date },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  myEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
  sports: { type: [String] },
});

export default mongoose.model<IUser>('users', UserSchema);
