/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { throwError } = require('../utils/responseAdapter');
const {
  createCategoryValidator, updateCategoryValidator, getCategoriesValidator,
  updateCategoryDescriptionValidator,
  followCategoryValidator,
} = require('../utils/category.validator');
const { userRepository } = require('../repositories/user.repository');
const { idValidator } = require('../utils/account.validation');
const { categoryRepository } = require('../repositories/category.repository');

class CategoryService {
  constructor() {
    this.userRepository = userRepository;
    this.categoryRepository = categoryRepository;
  }

  async createCategory(categoryObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = createCategoryValidator(categoryObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const user = await this.userRepository.getUser(categoryObj.authorId);
      if (!user) throwError(404, 'Account not found');
      const duplicate = await this.categoryRepository.findCategory(
        {
          category: {
            type: categoryObj.category.type,
            name: categoryObj.category.name,
          },
        },
      );
      if (duplicate) throwError(406, `${categoryObj.category.name} already exist`);
      const category = await this.categoryRepository.createCategory(
        { ...categoryObj, members: [categoryObj.authorId] },
      );
      if (!category) throwError(400, 'Mongo Error: Error creating category');
      return {
        data: category,
        message: 'BE: Category created successfully',
      };
    });
  }

  async updateCategory(categoryObj, activeId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = updateCategoryValidator(categoryObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { id, authorId, ...rest } = categoryObj;
      if (activeId !== authorId) {
        throwError(401, 'You are unauthorised to modify category');
      }
      const user = await this.userRepository.getUser(authorId);
      if (!user) throwError(404, 'Account not found');

      const category = await this.categoryRepository.getCategory(id);
      if (!category) throwError(404, 'Category not found');

      const result = await this.categoryRepository.updateCategory(id, rest);
      if (!result) throwError(400, 'Mongo Error: Error updating category');
      return {
        data: result,
        message: 'BE: Category updated successfully',
      };
    });
  }

  async updateCategoryDescription(categoryObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = updateCategoryDescriptionValidator(categoryObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { id, userId, description } = categoryObj;
      const user = await this.userRepository.getUser(userId);
      if (!user) throwError(404, 'Account not found');
      // only a member can modify a category
      const category = await this.categoryRepository.getCategory(id);
      if (!category) throwError(404, 'Category not found');
      if (!category.members.includes(userId)) throwError(406, 'Only members can perform this action');
      const result = await this.categoryRepository.updateCategory(
        id,
        {
          $set: { description, modifiedBy: { userId } },
          $push: { updates: userId },
        },
      );
      if (!result.category) throwError(400, 'Mongo Error: Error modifying category');
      return {
        data: result,
        message: 'BE: Category updated succesfull',
      };
    });
  }

  async follow_UnfollowCategory(categoryObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = followCategoryValidator(categoryObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const user = await this.userRepository.getUser(categoryObj.userId);
      if (!user) throwError(404, 'Account not found');

      const category = await this.categoryRepository.getCategory(categoryObj.id);
      if (!category) throwError(404, 'Category not found');

      const result = await this.categoryRepository.follow_UnfollowCategory(categoryObj);
      if (!result.category) throwError(400, 'Mongo Error: Error creating category');
      return {
        data: result.category,
        message: result.message,
      };
    });
  }

  async getCategory(categoryObj) {
    return tryCatchWrapperWithError(async () => {
      const { categoryId } = categoryObj;
      const validationResponse = await idValidator({ id: categoryId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const category = await this.categoryRepository.getCategory(categoryId);
      if (!category) throwError(404, 'Category not found');
      return {
        data: category,
        message: 'BE: Category retrieved',
      };
    });
  }

  async getCategories(categoryQuery) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = getCategoriesValidator(categoryQuery);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const categories = await this.categoryRepository.getCategories(categoryQuery);
      return {
        data: categories,
        message: 'BE: Categories retrieved successfully',
      };
    });
  }

  async getSearchedCategories(categoryQuery) {
    return tryCatchWrapperWithError(async () => {
      if (!categoryQuery) throwError(400, 'search query required');
      const categories = await this.categoryRepository.getSearchedCategories(categoryQuery);
      return {
        data: categories,
        message: 'BE: Categories retrieved successfully',
      };
    });
  }

  async getCategoryMembers(categoryQuery) {
    return tryCatchWrapperWithError(async () => {
      const { categoryId } = categoryQuery;
      const validationResponse = await idValidator({ id: categoryId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const category = await this.categoryRepository.getCategory(categoryId);
      if (!category) throwError(404, 'Category not found');
      const members = await this.userRepository.getUsers(category.members);
      return {
        data: members,
        message: 'BE: Members retrieved successfully',
      };
    });
  }

  async deleteCategory(categoryObj, activeId) {
    return tryCatchWrapperWithError(async () => {
      const { id } = categoryObj;
      const validationResponse = await idValidator({ id });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const category = await this.categoryRepository.getCategory(id);
      if (!category) throwError(404, 'Category not found');
      if (activeId !== category.authorId.toString()) {
        throwError(401, 'You are unauthorised to modify category');
      }
      const deletedCategory = await this.categoryRepository.deleteCategory({ _id: id });
      if (!deletedCategory) throwError(404, 'Error deleting category');
      return {
        data: deletedCategory._id,
        message: 'BE: Category deleted',
      };
    });
  }
}

module.exports = CategoryService;
