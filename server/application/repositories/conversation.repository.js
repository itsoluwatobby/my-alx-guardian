/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { ConversationModel, UserInConversationModel } = require('../models');
const { throwError } = require('../utils/responseAdapter');

class ConversationRepository {
  async conversationExists(queryObj) {
    if (!queryObj) return null;
    const conversation = await ConversationModel.exists(queryObj);
    return conversation;
  }

  async getConversation(conversationId, userId) {
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) throwError(404, 'conversation not found');
    if (conversation.hasEnded) throwError(403, 'You ended this conversation');
    await UserInConversationModel.updateMany(
      { userId },
      { $set: { isOpened: false } },
      { arrayFilters: [{ isOpened: true }] },
    );
    await UserInConversationModel.findOneAndUpdate(
      { userId, conversationId },
      { $set: { isOpened: true } },
    );
    return conversation;
  }

  async findConversation(conversationId) {
    const conversation = await ConversationModel.findById(conversationId);
    if (!conversation) throwError(404, 'conversation not found');
    if (conversation.hasEnded) throwError(403, 'You ended this conversation');
    return conversation;
  }

  async getConversations(queryObj) {
    const conversations = await ConversationModel.find(queryObj);
    return conversations;
  }

  async updateConversation(id, conversationObj) {
    const conversation = await ConversationModel.findOneAndUpdate(
      { _id: id },
      conversationObj,
      { new: true },
    );
    return conversation;
  }

  async createConversation(newConversationObj) {
    const { members } = newConversationObj;
    const newConversation = await ConversationModel.create(
      { ...newConversationObj, isGroupConversation: true },
    );
    const usersInConversation = members.map((memberId) => (
      { userId: memberId, conversationId: newConversation._id }
    ));
    await UserInConversationModel.insertMany(usersInConversation);
    return newConversation;
  }

  async updateUserLastSeenInConversation(conversationId, userId) {
    await UserInConversationModel.findOneAndUpdate(
      { userId, conversationId },
      { lastReadTimestamp: new Date() },
    );
  }

  async userAlreadyInConversation(conversationId, userId) {
    const isMember = await UserInConversationModel.exists(
      { userId, conversationId },
    );
    return isMember;
  }

  async endConversation(conversationId) {
    const result = await ConversationModel.findOneAndUpdate(
      { _id: conversationId },
      { $set: { hasEnded: true, isOpened: false } },
      { new: true },
    );
    return result;
  }
}

exports.conversationRepository = new ConversationRepository();
