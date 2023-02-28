import express, { Request, Response } from 'express';
import checkBody from '../modules/checkBody';
import User from '../models/User/users';
import { IUser } from '../models/User/IUser';
import bcrypt from 'bcrypt';

const router = express.Router();

// Route to Sign In
router.post('/signin', (req: Request, res: Response) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    return res
      .status(400)
      .json({ result: false, error: 'Missing or empty fields' });
  }

  User.findOne({ email: req.body.email, password: req.body.password }).then(
    (data: IUser | null) => {
      if (data && bcrypt.compareSync(req.body.password, data.password)) {
        res.json({
          result: true,
          firstName: data.firstName,
          lastName: data.firstName,
          pseudo: data.pseudo,
          avatar: data.avatar,
          birthday: data.birthday,
          gender: data.firstName,
          bio: data.bio,
          email: data.email,
          password: data.password,
          token: data.token,
          inscriptionDate: data.inscriptionDate,
          bookmarks: data.bookmarks,
          following: data.following,
          myEvents: data.myEvents,
          userSports: data.myEvents,
        });
      } else {
        res.json({ result: false, error: 'User not found or wrong password' });
      }
    }
  );
});

module.exports = router;
