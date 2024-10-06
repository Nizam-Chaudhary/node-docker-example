import { NextFunction, Request, Response } from 'express';
import { Post } from '../models/postModel';

export const getAllPosts = async (
  _req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: true,
      results: posts.length,
      data: posts,
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

export const getPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: true,
      data: post,
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

export const createPost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body);
    const post = await Post.create(req.body);
    res.status(201).json({
      status: true,
      message: 'post created successfully',
      data: post,
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

export const updatePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: true,
      message: 'post updated successfully',
      data: post,
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

export const deletePost = async (
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: true,
      message: 'post deleted successfully',
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
