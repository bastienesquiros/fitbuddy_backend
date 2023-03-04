// // export interface IUser {
// //     firstName: string;
// //     lastName: string;
// //     pseudo: string;
// //     avatar: string;
// //     birthday: Date;
// //     gender: string;
// //     bio: string;
// //     email: string;
// //     password: string;
// //     token: string;
// //     inscriptionDate: Date;
// //     bookmarks: string;
// //     following: string;
// //     myEvents: string;
// //     userSports: IUserSports[];
// //   }

// //   export interface IUserSports {
// //     sport: string;
// //     level: string;
// //   }

// import mongoose from 'mongoose';

// export interface IUser {
//   // firstName: string;
//   // lastName: string;
//   // pseudo: string;
//   // avatar?: string;
//   // birthday?: Date;
//   // gender?: string;
//   // bio?: string;
//   email: string;
//   password: string;
//   // token?: string;
//   // inscriptionDate?: Date;
//   // bookmarks?: mongoose.Schema.Types.ObjectId[];
//   // following?: mongoose.Schema.Types.ObjectId[];
//   // myEvents?: mongoose.Schema.Types.ObjectId[];
//   // userSports?: { sport: string; level: string }[];
//   save(): Promise<IUser>;
// }

// declare module 'mongoose' {
//   interface Document extends IUser {}
// }

export interface IUser {
  // name: string;
  email: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  // avatar: string;
  birthday: Date;
  gender: string;
  bio: string;
  password: string;
  token: string;
  inscriptionDate: Date;
  // bookmarks: string;
  // following: string;
  // myEvents: string;
  sport: [string];
}

// export interface IUserSports {
//   sport: string;
//   // level: string;
// }
