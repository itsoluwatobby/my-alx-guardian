const mongoose = require('mongoose');
const { CategoryEnum } = require('../utils/accountEnum');

const CategorySchema = mongoose.Schema(
  {
    category: {
      type: { type: String, required: [true, 'Category is required'], default: CategoryEnum.General },
      name: { type: String, default: '' },
    },
    badge: { type: String, default: '' },
    title: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    members: { type: Array, default: [] },
  },
  {
    timestamps: true,
  },
);

exports.CategoryModel = mongoose.model('category', CategorySchema);
