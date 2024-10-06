import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, 'User must have a user name'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User must have a password'],
    },
  },
  {
    collection: 'User',
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
