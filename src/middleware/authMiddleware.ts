import { NextFunction, Request, Response } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  const { user } = req.session;

  if (!user) {
    res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    return;
  }

  // @ts-ignore
  req.user = user;

  next();
};
