import { Schema, model } from 'mongoose';

interface IUser {
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
  sports: { type: [String] },
});

const User = model<IUser>('User', UserSchema);

export default User;
