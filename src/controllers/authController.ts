import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from '../models/userModel.js';

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      password: hashedPassword,
    });

    res.status(201).json({
      status: true,
      data: user,
    });
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
    });
    return;
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });

    if (!user) {
      res.status(404).json({
        status: false,
        message: 'user not found',
      });
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(201).json({
        status: false,
        message: 'incorrect password',
      });
      return;
    }

    // @ts-ignore
    req.session.user = user;
    res.status(200).json({
      status: true,
      message: 'success',
    });
    return;
  } catch (e) {
    console.error(e);
    res.status(400).json({
      status: false,
      message: 'Something went wrong',
    });
    return;
  }
};
