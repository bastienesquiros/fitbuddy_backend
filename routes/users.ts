import express, { Request, Response } from 'express';
import checkBody from '../modules/checkBody';
import bcrypt from 'bcrypt';
import uid2 from 'uid2';
import User, { IUser } from '../models/User/User';
import Event from '../models/Event/Event';

const router = express.Router();

// Route to Sign In
router.post('/signin', (req: Request, res: Response) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    return res
      .status(400)
      .json({ result: false, error: 'Missing or empty fields' });
  }
  User.findOne({ email: req.body.email }).then((user: IUser | null) => {
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({
        result: true,
        user: user,
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
  User.findOne({ email: req.body.email }).then((user: IUser | null) => {
    if (user === null) {
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
        bookmarks: req.body.bookmarks,
        myEvents: req.body.myEvents,
        sports: req.body.sports,
      });
      newUser.save().then(() => {
        console.log('User saved!');
      });
      res.json({ result: true, user: newUser });
    } else {
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

router.post('/addbookmark', (req: Request, res: Response) => {
  Event.findOne({ _id: req.body.id }).then((eventData: any) => {
    if (eventData !== null) {
      User.updateOne(
        { token: req.body.token },
        { $push: { bookmarks: eventData._id } }
      ).then(() => {
        res.json({ result: true, log: 'Bookmark Added' });
        console.log('addbookmark');
      });
    }
  });
});

router.delete('/removebookmark', (req: Request, res: Response) => {
  Event.findOne({ _id: req.body.id }).then((eventData: any) => {
    if (eventData !== null) {
      User.updateOne(
        { token: req.body.token },
        { $pull: { bookmarks: eventData._id } }
      ).then(() => {
        res.json({ result: true, log: 'Bookmark Deleted' });
        console.log('removebookmark');
      });
    }
  });
});

router.post('/bookmarks', (req: Request, res: Response) => {
  User.findOne({ token: req.body.token })
    .populate('bookmarks')
    .then((userData: any) => {
      if (userData !== null) {
        if (userData.bookmarks[0]) {
          res.json({ result: true, bookmarks: userData.bookmarks });
        } else {
          res.json({ result: false });
        }
      } else {
        res.json({ result: false });
      }
    });
});

router.post('/addevent', (req: Request, res: Response) => {
  Event.findOne({ _id: req.body.id }).then((eventData: any) => {
    if (eventData !== null) {
      User.updateOne(
        { token: req.body.token },
        { $push: { myEvents: eventData._id } }
      ).then(() => {
        res.json({ result: true, log: 'Event Added' });
        console.log('add event');
      });
    }
  });
});

router.delete('/removeevent', (req: Request, res: Response) => {
  Event.findOne({ _id: req.body.id }).then((eventData: any) => {
    if (eventData !== null) {
      User.updateOne(
        { token: req.body.token },
        { $pull: { myEvents: eventData._id } }
      ).then(() => {
        res.json({ result: true, log: 'Event Deleted' });
        console.log('remove event');
      });
    }
  });
});

router.post('/myevents', (req: Request, res: Response) => {
  User.findOne({ token: req.body.token })
    .populate('myEvents')
    .then((userData: any) => {
      if (userData !== null) {
        if (userData.myEvents[0]) {
          res.json({ result: true, events: userData.myEvents });
        } else {
          res.json({ result: false });
        }
      } else {
        res.json({ result: false });
      }
    });
});

module.exports = router;
