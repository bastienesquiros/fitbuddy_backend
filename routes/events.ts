import express, { Request, Response } from 'express';
import checkBody from '../modules/checkBody';
import Event from '../models/Event/Event';
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
    //const { token, sport, date, address, totalPlayers, description } = req.body;

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

router.get('/', (req: Request, res: Response) => {
  Event.find().then((eventsData) => {
    res.json({ result: true, events: eventsData });
  });
});

module.exports = router;
