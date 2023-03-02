import cors from 'cors';
import { Express } from 'express';
import express from 'express';

require('./models/connection');

const app: Express = express();
const PORT: Number = 3000;

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/users', userRouter);

let Server = app.listen(PORT, () => {
  console.log('Port is running on the ' + PORT);
});

module.exports = { app, Server };
