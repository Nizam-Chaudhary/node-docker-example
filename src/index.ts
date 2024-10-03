import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import express, { Request, Response } from 'express';

expand(config());

const app = express();

const PORT = process.env.PORT || 2000;

app.use('/', (req: Request, res: Response) => {
  res.send('<h1>Hello, World!</h1>');
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
