import mongoose from 'mongoose';
import app from './app';

const mongodbUrl = process.env.MONGODB_URL as string;
const port = process.env.PORT as string;

mongoose
  .connect(mongodbUrl)
  .then(() => {
    app.listen(port, () => {
      console.log('database is connected');
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.log('Error connecting to MongoDB');
    process.exit(1);
  }); //number 1 means there is something wrong with the connections
