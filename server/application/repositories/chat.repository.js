/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { ConversationModel, UsersInConversationModel } = require('../models');

class ChatRepository {
  async createChat(newChatObj) {
    const { members } = newChatObj;
    const result = await ConversationModel.create(newChatObj);
    const usersInConversation = members.map((memberId) => (
      { userId: memberId, conversationId: result._id }
    ));
    await UsersInConversationModel.insertMany(usersInConversation);
    return result;
  }

  async chatExists(queryObj) {
    if (!queryObj) return null;
    const { authorId, members } = queryObj;
    const chat = await ConversationModel.exists(
      { authorId, members },
    );
    return chat;
  }

  // async deleteChat(chatId) {
  //   const result = await ConversationModel.findOneAndUpdate(
  //     { _id: chatId },
  //     { $set: { hasEnded: true, isOpened: false } },
  //     { new: true },
  //   );
  //   return result;
  // }
}

exports.chatRepository = new ChatRepository();
