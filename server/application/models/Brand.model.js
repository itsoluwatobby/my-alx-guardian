const mongoose = require('mongoose');
const { userTypeEnums } = require('../utils/accountEnum');
const { Provider } = require('../utils/constants');

const BrandSchema = mongoose.Schema(
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
    userType: { type: String, default: userTypeEnums.Unknown },
    description: { type: String, trim: true, default: '' },
    country: { type: String, default: '', trim: true },
    companyName: { type: String, required: [true, 'companyName is required'], trim: true },
    favoriteInfluencers: { type: Array, default: [], ref: 'influencers' },
    isAccountDeleted: { type: Boolean, default: false },
    campaignHistory: { type: Array, default: [] },
    verified: { type: Boolean, default: false },
    isPasswordReset: {
      reset: { type: Boolean, default: false },
      otpVerified: { type: Boolean, default: false },
    },
    accessToken: { type: String, default: '' },
    // googleId: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);
exports.BrandModel = mongoose.model('brands', BrandSchema);
