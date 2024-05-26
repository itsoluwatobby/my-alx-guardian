const mongoose = require('mongoose');
const { OTP_PURPOSE } = require('../utils/constants');

const TokenObject = new mongoose.Schema(
  {
    otp: { type: String },
    purpose: { type: String, default: OTP_PURPOSE.PASS, enum: Object.values(OTP_PURPOSE) },
    createdAt: { type: Date, default: null },
  },
);

const AuthOtpSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    trim: true,
  },
  token: TokenObject,
}, { timestamps: true });

exports.AuthOtpModel = mongoose.model('authOtps', AuthOtpSchema);
