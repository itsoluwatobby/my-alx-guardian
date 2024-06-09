/* eslint-disable class-methods-use-this */
const { CategoryModel, PostsModel } = require('../models');
const { CategoryEnum } = require('../utils/accountEnum');
const { pagination } = require('../utils/paginate');

class CategoryRepository {
  async getSearchedCategories(query) {
    const caseInsensitiveQuery = new RegExp(query, 'i');
    const categories = await CategoryModel.find(
      {
        $or: [
          { 'category.type': { $in: [caseInsensitiveQuery] } },
          { 'category.name': { $in: [caseInsensitiveQuery] } },
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
      { 'category.type': type },
    );
    return categories;
  }

  async getCategory(categoryId) {
    const category = await CategoryModel.findById(categoryId);
    return category;
  }

  async findCategory(queryObj) {
    const category = await CategoryModel.findOne(queryObj);
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
      message = `BE: You joined ${result.category.name}`;
    } else {
      result = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { $pull: { members: userId } },
        { new: true },
      );
      message = `BE: You left ${result.category.name}`;
    }
    const appendedMsg = result.category.name === CategoryEnum.Forums ? CategoryEnum.Forums : '';
    return { category: result, message: `${message} ${appendedMsg}` };
  }

  async updateCategory(id, categoryObj) {
    const result = await CategoryModel.findOneAndUpdate(
      { _id: id },
      { $set: categoryObj },
      { new: true },
    );
    return result;
  }

  async createCategory(newCategoryObj) {
    const result = await CategoryModel.create(newCategoryObj);
    return result;
  }

  async deleteCategory(query) {
    const { _id } = query;
    const category = await this.getCategory(_id);
    await PostsModel.deleteMany(
      {
        $and: [
          { 'category.type:': { $in: [category.category.type] } },
          { 'category.name:': { $in: [category.category.name] } },
        ],
      },
    );
    const result = await CategoryModel.findOneAndDelete(query);
    return result;
  }
}

exports.categoryRepository = new CategoryRepository();
