import express, { Request, Response } from 'express';
import checkBody from '../modules/checkBody';
import Event, { IEvent } from '../models/Event/Event';
import User, { IUser } from '../models/User/User';

const router = express.Router();

//Route add event
router.post('/add', (req: Request, res: Response) => {
  if (
    !checkBody(req.body, [
      'sport',
      'date',
      'address',
      'totalPlayers',
      'description',
    ])
  ) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  } else {
    User.findOne({ token: req.body.token }).then((user: IUser | null) => {
      if (!user) {
        res.json({ result: false });
      } else {
        const authorData = user._id;
        res.json({ result: true });
        const newEvent = new Event({
          author: authorData,
          sport: req.body.sport,
          date: req.body.date,
          address: req.body.address,
          totalPlayers: req.body.totalPlayers,
          description: req.body.description,
        });
        newEvent.save().then(() => {
          console.log('Event saved!');
        });
      }
    });
  }
});

router.post('/forme', (req: Request, res: Response) => {
  User.findOne({ token: req.body.token }).then((userData: IUser | null) => {
    let userSports: string[] = [];
    if (userData !== null) {
      for (let i: number = 0; i < userData.sports.length; i++) {
        userSports.push(userData.sports[i]);
      }
      Event.find({}).then((eventData: any) => {
        let eventSports: string[] = [];
        for (let i: number = 0; i < eventData.length; i++) {
          eventSports.push(eventData[i].sport);
        }

        const matchingSports = eventSports.filter((sport) =>
          userSports.includes(sport)
        );

        Event.find({ sport: matchingSports })
          .populate('author')
          .then((matchingData) => {
            res.json({ events: matchingData });
          });
      });
    }
  });
});

router.post('/discover', (req: Request, res: Response) => {
  User.findOne({ token: req.body.token }).then((userData: IUser | null) => {
    let userSports: string[] = [];
    if (userData !== null) {
      for (let i: number = 0; i < userData.sports.length; i++) {
        userSports.push(userData.sports[i]);
      }
      Event.find({}).then((eventData: any) => {
        let eventSports: string[] = [];
        for (let i: number = 0; i < eventData.length; i++) {
          eventSports.push(eventData[i].sport);
        }

        const matchingSports = eventSports.filter(
          (sport) => !userSports.includes(sport)
        );

        Event.find({ sport: matchingSports })
          .populate('author')
          .then((matchingData) => {
            res.json({ events: matchingData });
          });
      });
    }
  });
});

module.exports = router;
