/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { ConversationModel, UsersInConversationModel } = require('../models');
const { throwError } = require('../utils/responseAdapter');
const { messagesRepository } = require('./messages.repository');

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
    await UsersInConversationModel.updateMany(
      { userId },
      { $set: { isOpened: false } },
      { arrayFilters: [{ isOpened: true }] },
    );
    await UsersInConversationModel.findOneAndUpdate(
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
    await UsersInConversationModel.insertMany(usersInConversation);
    return newConversation;
  }

  async updateUserLastSeenInConversation(conversationId, userId) {
    await UsersInConversationModel.findOneAndUpdate(
      { userId, conversationId },
      { lastReadTimestamp: new Date() },
    );
  }

  async userAlreadyInConversation(conversationId, userId) {
    const isMember = await UsersInConversationModel.exists(
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

  async getConverstionsByUser(userId) {
    const conversations = await ConversationModel.find(
      {
        $or: [
          { authorId: userId },
          { members: { $in: [userId] } },
        ],
      },
    );
    return conversations;
  }

  async addInfluencerToConversation(conversationId, influencerId) {
    const conversation = await ConversationModel.findOneAndUpdate(
      { _id: conversationId },
      { $addToSet: { members: influencerId } },
      { new: true },
    );
    if (!await this.userAlreadyInConversation(conversationId, influencerId)) {
      await UsersInConversationModel.insertMany(
        { conversationId, userId: influencerId },
      );
    }
    return conversation;
  }

  async getConversationMembers(conversationId) {
    const conversation = await this.findConversation(conversationId);
    const membersChatInfo = await Promise.all(conversation.members.map(async (memberId) => {
      const res = await messagesRepository.unreadMessages(conversationId, memberId);
      return res;
    }));
    return [conversation.members, membersChatInfo];
  }
}

exports.conversationRepository = new ConversationRepository();
