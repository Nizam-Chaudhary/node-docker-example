import { NextFunction, Request, Response } from 'express';
import { User } from '../models/userModel';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { user } = req.session;
  console.log('User: \n', user);

  if (!user) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }

  // @ts-ignore
  req.user = user;

  next();
};
