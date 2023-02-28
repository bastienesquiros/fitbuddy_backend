import { Request, Response, Express } from 'express';
import express from 'express';

require('./models/connection');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');

const app: Express = express();
const PORT: Number = 3000;

const cors = require('cors');
app.use(cors());

app.use('/', indexRouter);
app.use('/user', userRouter);

let Server = app.listen(PORT, () => {
  console.log('Port is running on the ' + PORT);
});

module.exports = { app, Server };
