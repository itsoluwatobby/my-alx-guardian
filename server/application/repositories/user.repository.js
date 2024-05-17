/* eslint-disable class-methods-use-this */
const { UserModel } = require('../models');

class UserRepository {
  async getUser(query) {
    if (!query) return null;
    const user = await UserModel.findOne({ query })
    return user;
  }

  async getUsers(query) {
    const users = await UserModel.find({ _id: query });
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
    const result = await UserModel.findOneAndDelete({ _id: query });
    return result;
  }
}

exports.userRepository = new UserRepository();
