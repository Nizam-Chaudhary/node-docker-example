import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

expand(config());

const app = express();

mongoose
  .connect('mongodb://nizam:nizam@mongo:27017/?authSource=admin')
  .then(() => console.log('Successfully connected with DB'))
  .catch((e) => console.error(e));

const PORT = process.env.PORT || 3000;

app.use('/', (req: Request, res: Response) => {
  res.send('<h1>Hello, World!!!</h1>');
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
