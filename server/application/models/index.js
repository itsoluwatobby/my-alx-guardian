const { ConversationModel, UsersInConversationModel } = require('./Conversation.model');
const { PostsModel, SharesModel } = require('./Posts.model');
const { CategoryModel } = require('./Categories.models');
const { MessagesModel } = require('./Messages.model');
const { AuthOtpModel } = require('./AuthOtp.model');
const { CommentModel } = require('./Comment.model');
const { UserModel } = require('./User.model');

module.exports = {
  UserModel,
  PostsModel,
  SharesModel,
  CategoryModel,
  AuthOtpModel,
  CommentModel,
  ConversationModel,
  MessagesModel,
  UsersInConversationModel,
};
