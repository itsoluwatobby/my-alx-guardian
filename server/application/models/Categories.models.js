const mongoose = require('mongoose');
const { CategoryEnum } = require('../utils/accountEnum');

const CategorySchema = mongoose.Schema(
  {
    type: { type: String, default: CategoryEnum.General },
    cohort: { type: String, default: '', trim: true },
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
