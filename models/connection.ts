import mongoose from 'mongoose';

const connectionString =
  'mongodb+srv://fitbuddy:fitbuddycapsule@fitbuddy.pw2syxi.mongodb.net/fitbuddy';
mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch((error: any) => console.error(error));
