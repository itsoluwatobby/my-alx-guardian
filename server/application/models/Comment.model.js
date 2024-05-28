const mongoose = require('mongoose');

const Tag = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, required: [true, 'userId is required'], immutable: true, ref: 'users',
    },
    responseId: {
      type: mongoose.Schema.Types.ObjectId, required: [true, 'responseId is required'], immutable: true, ref: 'comments',
    },
  },
  {
    timestamps: true,
  },
);

const CommentSchema = mongoose.Schema(
  {
    postId: {
      type: String, required: [true, 'postId is required'], immutable: true, ref: 'posts',
    },
    userId: {
      type: String, required: [true, 'userId is required'], immutable: true, ref: 'users',
    },
    comment: { type: String, required: [true, 'comment is required'], trim: true },
    likes: { type: Array, default: [] },
    tags: [Tag],
  },
  {
    timestamps: true,
  },
);
exports.CommentModel = mongoose.model('comments', CommentSchema);
