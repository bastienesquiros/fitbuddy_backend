import express, { Request, Response } from 'express';
import checkBody from '../modules/checkBody';
import Event from '../models/Event/Event';

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
    const { sport, date, address, totalPlayers, description } = req.body;

    Event.create({
      sport,
      date,
      address,
      totalPlayers,
      description,
    });
    res.json({ result: true });
  }
});

router.get('/', (req: Request, res: Response) => {
  Event.find().then((eventsData) => {
    res.json({ result: true, events: eventsData });
  });
});

module.exports = router;
