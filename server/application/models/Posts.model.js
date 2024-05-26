const mongoose = require('mongoose');
const { CategoryEnum } = require('../utils/accountEnum');

const Reposts = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: [true, 'userId is required'], ref: 'users' },
    repostId: { type: mongoose.Schema.Types.ObjectId, required: [true, 'repostId is required'], ref: 'posts' },
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
    repostId: { type: String, ref: 'posts' },
    body: { type: String, required: [true, 'body is required'], trim: true },
    category: {
      type: { type: String, default: CategoryEnum.General },
      name: { type: String, default: '' },
    },
    picture: { type: String, default: '' },
    likes: { type: Array, default: [] },
    isRepost: { type: Boolean, default: false },
    reposts: [Reposts],
    shares: [Shares],
  },
  {
    timestamps: true,
  },
);
exports.PostsModel = mongoose.model('posts', PostsSchema);
