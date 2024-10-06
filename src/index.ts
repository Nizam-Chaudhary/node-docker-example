import RedisStore from 'connect-redis';
import express, { Request, Response } from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import env from './config/env';
import postRouter from './routes/postRoutes';
import userRouter from './routes/userRoutes';

let redisClient = createClient({
  url: `redis://${env.REDIS_URL}:${env.REDIS_PORT}`,
});
redisClient.connect().catch(console.error);
const app = express();

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    // @ts-ignore
    secret: env.SESSION_SECRET,
    // resave: false,
    // saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000,
    },
  })
);

app.use(express.json());

const connectWithRetry = () => {
  mongoose
    .connect(env.MONGO_URL)
    .then(() => console.log('Successfully connected with DB'))
    .catch((e) => {
      console.error(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
