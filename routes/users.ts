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

  User.findOne({ email: req.body.email }).then((data: IUser | null) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({
        result: true,
      });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

//Route to Sign Up
router.post('/signup', (req: Request, res: Response) => {
  if (
    !checkBody(req.body, [
      'pseudo',
      'firstName',
      'lastName',
      'password',
      'birthday',
      'gender',
      'email',
    ])
  ) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  console.log(req.body);
  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then((data: IUser | null) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const {
        firstName,
        lastName,
        pseudo,
        avatar,
        birthday,
        gender,
        bio,
        email,
        inscriptionDate,
        sport,
        level,
      } = req.body;

      User.create({
        firstName,
        lastName,
        pseudo,
        avatar,
        birthday,
        gender,
        bio,
        email,
        inscriptionDate,
        userSports: [
          {
            sport,
            level,
          },
        ],
        password: hash,
        // token: uid2(32),
      });
      res.json({ result: true });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

module.exports = router;
