import cors from 'cors';
import { Express } from 'express';
import express from 'express';

require('./models/connection');

const app: Express = express();
const PORT: Number = 3000;

var userRouter = require('./routes/users');
var eventRouter = require('./routes/events');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/users', userRouter);
app.use('/events', eventRouter);

let Server = app.listen(PORT, () => {
  console.log('Port is running on the ' + PORT);
});

module.exports = { app, Server };
