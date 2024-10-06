import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import env from './config/env';

const app = express();

mongoose
  .connect(env.MONGO_URL)
  .then(() => console.log('Successfully connected with DB'))
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 3000;

app.use('/', (req: Request, res: Response) => {
  res.send('<h1>Hello, World!!!</h1>');
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
