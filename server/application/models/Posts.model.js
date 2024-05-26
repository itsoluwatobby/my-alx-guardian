const mongoose = require('mongoose');
const { CategoryEnum } = require('../utils/accountEnum');

const Reposts = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: [true, 'userId is required'], ref: 'users' },
  },
  {
    timestamps: true,
  },
);

const Shares = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: [true, 'userId is required'], ref: 'users' },
    platform: { type: String, default: '' },
  },
  {
    timestamps: true,
  },
);

const PostsSchema = mongoose.Schema(
  {
    title: { type: String, trim: true },
    userId: { type: String, required: [true, 'userId is required'], ref: 'users' },
    body: { type: String, required: [true, 'body is required'], trim: true },
    type: { type: String, default: CategoryEnum.General },
    cohort: { type: String, trim: true },
    picture: { type: String, default: '' },
    likes: { type: Array, default: [] },
    reposts: [Reposts],
    shares: [Shares],
  },
  {
    timestamps: true,
  },
);
exports.PostsModel = mongoose.model('posts', PostsSchema);
