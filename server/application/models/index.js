const { AuthOtpModel } = require('./AuthOtp.model');
const { CategoryModel } = require('./Categories.models');
const { CommentModel } = require('./Comment.model');
const { PostsModel, SharesModel } = require('./Posts.model');
const { UserModel } = require('./User.model');

module.exports = {
  UserModel,
  PostsModel,
  SharesModel,
  CategoryModel,
  AuthOtpModel,
  CommentModel,
};
