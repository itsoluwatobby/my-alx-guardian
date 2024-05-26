const mongoose = require('mongoose');
const { Provider } = require('../utils/constants');

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, required: [true, 'firstName is required'], trim: true },
    lastName: { type: String, required: [true, 'lastName is required'], trim: true },
    email: {
      type: String, required: [true, 'email is required'], unique: true, trim: true,
    },
    password: {
      type: String, required: [true, 'password is required'], trim: true, select: false,
    },
    profilePicture: { type: String, default: '' },
    provider: {
      type: String,
      default: Provider.Local,
      enum: Object.values(Provider),
    },
    bio: { type: String, trim: true, default: '' },
    country: { type: String, default: '', trim: true },
    isAccountDeleted: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    isPasswordReset: {
      reset: { type: Boolean, default: false },
      otpVerified: { type: Boolean, default: false },
    },
    accessToken: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);
exports.UserModel = mongoose.model('users', UserSchema);
