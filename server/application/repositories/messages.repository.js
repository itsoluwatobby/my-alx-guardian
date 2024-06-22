/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { MessagesModel, UsersInConversationModel } = require('../models');

class MessagesRepository {
  async getMessages(conversationId) {
    const messages = await MessagesModel.find({ conversationId });
    return messages;
  }

  async updateMessage(messageId, messageObj) {
    const updatedMessage = { ...messageObj, isEdited: true };
    const editMessage = await MessagesModel.findOneAndUpdate(
      { _id: messageId },
      { $set: { ...updatedMessage } },
      { new: true },
    );
    return editMessage;
  }

  async getMessage(messageId) {
    const message = await MessagesModel.findById(messageId);
    return message;
  }

  async isMessageDelivered(messageId) {
    const editMessage = await MessagesModel.findOneAndUpdate(
      { _id: messageId },
      { $set: { isDelivered: true } },
      { new: true },
    );
    return editMessage;
  }

  async createMessage(newMessagesObj) {
    const result = await MessagesModel.create(newMessagesObj);
    return result;
  }

  async deleteMessage(messageId) {
    const result = await MessagesModel.findOneAndUpdate(
      { _id: messageId },
      { $set: { isDeleted: true } },
      { new: true },
    );
    return result;
  }

  async unreadMessages(conversationId, userId) {
    // call for getting users in conversation
    const user = await UsersInConversationModel.findOne({ userId, conversationId }).exec();
    const unreadCount = await MessagesModel.countDocuments({
      conversationId,
      createdAt: { $gt: user.lastReadTimestamp },
    });
    return { ...user._doc, unreadCount };
  }
}

exports.messagesRepository = new MessagesRepository();
