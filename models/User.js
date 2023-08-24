// import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
const mongoose = require('mongoose');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);
// module.exports = User = model('user', userSchema);
// const User = mongoose.model('User', userSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

// module.exports.user = User;

export default User;
