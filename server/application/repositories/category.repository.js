/* eslint-disable class-methods-use-this */
const { CategoryModel } = require('../models');
const { CategoryEnum } = require('../utils/accountEnum');
const { pagination } = require('../utils/paginate');

class CategoryRepository {
  async getSearchedCategories(query) {
    const caseInsensitiveQuery = new RegExp(query, 'i');
    const categories = await CategoryModel.find(
      {
        $or: [
          {
            category: {
              $or: [
                { type: { $in: [caseInsensitiveQuery] } },
                { name: { $in: [caseInsensitiveQuery] } },
              ],
            },
          },
          { title: { $in: [caseInsensitiveQuery] } },
        ],
      },
    );
    return categories;
  }

  async getCategories(query) {
    const { pageNumber, limit, type } = query;
    const categories = await pagination(
      pageNumber,
      limit,
      CategoryModel,
      { category: { type: CategoryEnum[type] } },
    );
    return categories;
  }

  async getCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId);
    return category;
  }

  async follow_UnfollowCategory(categoryObj) {
    const { id, userId } = categoryObj;
    const category = await this.getCategory(id);
    let result;
    let message;
    if (!category.members.includes(userId)) {
      result = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { $push: { members: userId } },
        { new: true },
      );
      message = `BE: You joined this ${result.category.name}`;
    } else {
      result = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { $pull: { members: userId } },
        { new: true },
      );
      message = `BE: You left this ${result.category.name}`;
    }
    return { category: result, message };
  }

  async updateCategory(id, categoryObj) {
    const result = await CategoryModel.findOneAndUpdate({ _id: id }, categoryObj, { new: true });
    return result;
  }

  async createCategory(newCategoryObj) {
    const result = await CategoryModel.create(newCategoryObj);
    return result;
  }

  async deleteCategory(query) {
    const result = await CategoryModel.findOneAndDelete(query);
    return result;
  }
}

exports.categoryRepository = new CategoryRepository();
