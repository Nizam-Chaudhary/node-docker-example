import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

expand(config());

const environments = {
  development: {
    PORT: process.env.PORT,
    MONGO_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/blogs?authSource=admin`,
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
  production: {
    PORT: process.env.PORT,
    MONGO_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/blogs?authSource=admin`,
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
  test: {
    PORT: process.env.PORT,
    MONGO_URL: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/blogs?authSource=admin`,
    REDIS_URL: process.env.REDIS_URL || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || '6379',
    SESSION_SECRET: process.env.SESSION_SECRET,
  },
};

export default process.env.NODE_ENV === 'production'
  ? environments['production']
  : process.env.NODE_ENV === 'test'
  ? environments['test']
  : environments['development'];
