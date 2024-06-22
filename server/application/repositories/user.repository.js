/* eslint-disable class-methods-use-this */
const { UserModel } = require('../models');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');

class UserRepository {
  async getUser(query, withPassword = false) {
    if (!query) return null;
    let user;
    if (query.includes('@')) {
      user = await UserModel.findOne({
        email: query, isAccountDeleted: false,
      }).select(withPassword ? '+password' : '-password');
    } else {
      user = await UserModel.findOne({
        _id: query, isAccountDeleted: false,
      }).select(withPassword ? '+password' : '-password');
    }
    return user;
  }

  // for retrieving deleted acounts
  async findUser(email, withPassword = false) {
    return tryCatchWrapperWithError(async () => {
      if (!email) return null;
      const user = await UserModel.findOne(
        { email },
      ).select(withPassword ? '+password' : '-password');
      return user;
    });
  }

  async getUsers(query) {
    const users = await UserModel.find(
      {
        _id: { $in: query },
        isAccountDeleted: false,
      },
    ).select('-isPasswordReset -isAccountDeleted -createdAt -updatedAt');
    return users;
  }

  async getSearchedUsers(query) {
    const caseInsensitiveQuery = new RegExp(query, 'i');
    const users = await UserModel.find({
      $and: [
        {
          $or: [
            { email: { $in: [caseInsensitiveQuery] } },
            { firstName: { $in: [caseInsensitiveQuery] } },
            { lastName: { $in: [caseInsensitiveQuery] } },
            { skills: { $in: [caseInsensitiveQuery] } },
            { country: { $in: [caseInsensitiveQuery] } },
            { cohort: { $in: [caseInsensitiveQuery] } },
            { forums: { $in: [caseInsensitiveQuery] } },
          ],
        },
        { isAccountDeleted: false },
      ],
    }).select('-isPasswordReset -accessToken -isAccountDeleted');
    return users;
  }

  async updateUser(id, userObj) {
    const result = await UserModel.findOneAndUpdate({ _id: id }, userObj, { new: true });
    return result;
  }

  async createUser(newUserObj) {
    const result = await UserModel.create(newUserObj);
    return result;
  }

  async deleteUser(query) {
    const initUserObj = { isAccountDeleted: true, accessToken: '' };
    const result = await this.updateUser(query, initUserObj);
    return result;
  }

  async deleteAccount(query) {
    await UserModel.deleteOne({ _id: query });
  }
}

exports.userRepository = new UserRepository();
