import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config());

const environments = {
  development: {
    PORT: process.env.PORT,
    MONGO_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`,
  },
  production: {
    PORT: process.env.PORT,
    MONGO_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`,
  },
  test: {
    PORT: process.env.PORT,
    MONGO_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=admin`,
  },
};

export default process.env.NODE_ENV === 'production'
  ? environments['production']
  : process.env.NODE_ENV === 'test'
  ? environments['test']
  : environments['development'];
