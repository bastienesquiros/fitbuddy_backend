import mongoose from 'mongoose';
import process from 'process'; // Import to be able to use process in TS
import dotenv from 'dotenv'; // Import to read the .env in TS

dotenv.config(); // Loads .env

const connectionString =
  'mongodb+srv://fitbuddy:fitbuddycapsule@fitbuddy.pw2syxi.mongodb.net/fitbuddy';

if (connectionString) {
  mongoose
    .connect(connectionString, { connectTimeoutMS: 2000 })
    .then(() => console.log('Database connected'))
    .catch((error: any) => console.error(error));
} else {
  console.error('MongoDB connection string is undefined');
}
