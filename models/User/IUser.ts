export interface IUser {
    firstName: string;
    lastName: string;
    pseudo: string;
    avatar: string;
    birthday: Date;
    gender: string;
    bio: string;
    email: string;
    password: string;
    token: string;
    inscriptionDate: Date;
    bookmarks: string;
    following: string;
    myEvents: string;
    userSports: IUserSports[];
  }
  
  export interface IUserSports {
    sport: string;
    level: string;
  }