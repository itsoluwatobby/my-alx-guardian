/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { chatRepository } = require('../repositories/chat.repository');
const { conversationRepository } = require('../repositories/conversation.repository');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const {
  createConversationValidator, getConversationValidator, endConversationValidator,
  createChatValidator,
} = require('../utils/conversation.validator');
const { throwError } = require('../utils/responseAdapter');

class ConversationService {
  constructor() {
    this.conversationRepository = conversationRepository;
    this.chatRepository = chatRepository;
  }

  async createConversation(conversationObj) {
    return tryCatchWrapperWithError(async () => {
      const { authorId, campaignId } = conversationObj;
      const validationResponse = createConversationValidator(conversationObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      if (await this.conversationRepository.conversationExists({ authorId, campaignId })) {
        throwError(409, 'Conversation already exist');
      }
      const conversation = await this.conversationRepository.createConversation(conversationObj);
      if (!conversation) throwError(400, 'Mongo Error- Error creating conversation');

      return {
        data: conversation,
        message: 'BE: Conversation created successfully',
      };
    });
  }

  async createChat(chatObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = createChatValidator(chatObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      if (await this.chatRepository.chatExists(chatObj)) {
        throwError(409, 'Chat already exist');
      }
      const chat = await this.chatRepository.createChat(chatObj);
      if (!chat) throwError(400, 'Mongo Error- Error creating chat');

      return {
        data: chat,
        message: 'BE: Chat created successfully',
      };
    });
  }

  async getConversation(conversationObj) {
    return tryCatchWrapperWithError(async () => {
      const { conversationId, activeId } = conversationObj;
      const validationResponse = getConversationValidator({ conversationId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const conversation = await this.conversationRepository.getConversation(
        conversationId,
        activeId,
      );

      return {
        data: conversation,
        message: 'BE: Conversation created successfully',
      };
    });
  }

  async endConversation(conversationObj) {
    return tryCatchWrapperWithError(async () => {
      const { activeId, conversationId } = conversationObj;
      const validationResponse = endConversationValidator(conversationObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const foundConversation = await this.conversationRepository.findConversation(conversationId);
      if (foundConversation.authorId.toString() !== activeId) throwError(403, 'Unauthorzsed to modified conversation');

      const conversation = await this.conversationRepository.endConversation(conversationId);
      if (!conversation) throwError(400, 'Mongo Error- Error modifying conversation');

      return {
        data: conversation,
        message: 'BE: Conversation closed',
      };
    });
  }
}

module.exports = ConversationService;
