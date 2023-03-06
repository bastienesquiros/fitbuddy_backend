import express, { Request, Response } from 'express';
import checkBody from '../modules/checkBody';
import User from '../models/User/User';
import bcrypt from 'bcrypt';
import uid2 from 'uid2';

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
  // console.log(req.body);
  if (
    !checkBody(req.body, [
      'firstName',
      'lastName',
      'pseudo',
      'birthday',
      'gender',
      'bio',
      'email',
      'password',
      'inscriptionDate',
      'sports',
    ])
  ) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then((data: IUser | null) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pseudo: req.body.pseudo,
        birthday: req.body.birthday,
        gender: req.body.gender,
        bio: req.body.bio,
        email: req.body.email,
        password: hash,
        token: uid2(32),
        inscriptionDate: req.body.inscriptionDate,
        sports: req.body.sports,
      });
      newUser.save().then(() => {
        // console.log('User saved!');
      });
      res.json({ result: true });
    } else {
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

module.exports = router;
