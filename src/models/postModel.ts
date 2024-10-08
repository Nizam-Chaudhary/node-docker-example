import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post must have a title'],
    },
    body: {
      type: String,
      required: [true, 'Post must have a body'],
    },
  },
  {
    collection: 'Post',
    timestamps: true,
  }
);

export const Post = mongoose.model('Post', postSchema);
