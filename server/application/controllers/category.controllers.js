/* eslint-disable class-methods-use-this */
const CategoryService = require('../services/category.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class CategoryController {
  categoryService = new CategoryService();

  createCategory(req, res) {
    return tryCatchWrapper(res, async () => {
      const categorys = await this.categoryService.createCategory(req.body);
      return res.json(response.success(categorys.data, categorys.message));
    });
  }

  getCategory(req, res) {
    return tryCatchWrapper(res, async () => {
      const category = await this.categoryService.getCategory(req.params);
      return res.json(response.success(category.data, category.message));
    });
  }

  getCategories(req, res) {
    return tryCatchWrapper(res, async () => {
      const categories = await this.categoryService.getCategories(req.query);
      return res.json(response.success(categories.data, categories.message));
    });
  }

  getSearchedCategories(req, res) {
    return tryCatchWrapper(res, async () => {
      const categories = await this.categoryService.getSearchedCategories(req.query.search);
      return res.json(response.success(categories.data, categories.message));
    });
  }

  getCategoryMembers(req, res) {
    return tryCatchWrapper(res, async () => {
      const members = await this.categoryService.getCategoryMembers(req.params);
      return res.json(response.success(members.data, members.message));
    });
  }

  updateCategory(req, res) {
    return tryCatchWrapper(res, async () => {
      const category = await this.categoryService.updateCategory(req);
      return res.json(response.success(category.data, category.message));
    });
  }

  updateCategoryDescription(req, res) {
    return tryCatchWrapper(res, async () => {
      const category = await this.categoryService.updateCategoryDescription(req.body);
      return res.json(response.success(category.data, category.message));
    });
  }

  follow_UnfollowCategory(req, res) {
    return tryCatchWrapper(res, async () => {
      const category = await this.categoryService.follow_UnfollowCategory(req.body);
      return res.json(response.success(category.data, category.message));
    });
  }

  deleteCategory(req, res) {
    return tryCatchWrapper(res, async () => {
      const category = await this.categoryService.deleteCategory(req);
      return res.json(response.success(category.data, category.message));
    });
  }
}

module.exports = new CategoryController();
