const mongoose = require('mongoose');
const { CategoryEnum } = require('../utils/accountEnum');

const RecentUpdate = new mongoose.Schema(
  {
    userId: { type: String, default: '', ref: 'users' },
  },
  {
    timestamps: true,
  },
);

const CategorySchema = mongoose.Schema(
  {
    category: {
      type: { type: String, required: [true, 'Category is required'], default: CategoryEnum.General },
      name: { type: String, unique: true, default: '' },
    },
    banner: { type: String, default: '' },
    title: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    authorId: { type: String, required: [true, 'authorId is required'], immutable: true, ref: 'users' },
    members: { type: Array, default: [] },
    updatedBy: RecentUpdate,
    updates: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

exports.CategoryModel = mongoose.model('category', CategorySchema);
