/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { chatRepository } = require('../repositories/chat.repository');
const { userRepository } = require('../repositories/user.repository');
const { conversationRepository } = require('../repositories/conversation.repository');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const {
  createConversationValidator, getConversationValidator, endConversationValidator,
  getConversationsByUserValidator, addInfluencerToConversationValidator,
  getInfluencersInConversationValidator, createChatValidator,
} = require('../utils/conversation.validator');
const { throwError } = require('../utils/responseAdapter');

class ConversationService {
  constructor() {
    this.conversationRepository = conversationRepository;
    this.userRepository = userRepository;
    this.chatRepository = chatRepository;
  }

  async createConversation(conversationObj) {
    return tryCatchWrapperWithError(async () => {
      const { authorId } = conversationObj;
      const validationResponse = createConversationValidator(conversationObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      if (await this.conversationRepository.conversationExists({ authorId })) {
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

  async getConverstionsByUser(activeId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = getConversationsByUserValidator({ activeId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      // eslint-disable-next-line max-len
      const conversations = await this.conversationRepository.getConverstionsByUser(activeId);
      // if (!conversations) throwError(404, 'No conversations found for this campaign');

      return {
        data: conversations,
        message: 'BE: Conversations retrieved Successfully',
      };
    });
  }

  async addInfluencerToConversation(conversationId, influencerId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = addInfluencerToConversationValidator({ conversationId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const conversation = await this.conversationRepository.addInfluencerToConversation(
        conversationId,
        influencerId,
      );
      if (!conversation) throwError(404, 'Conversation not found');

      return {
        data: conversation,
        message: 'BE: Influencer added to conversation',
      };
    });
  }

  async getConversationMembers(queryObj) {
    const { conversationId } = queryObj;
    return tryCatchWrapperWithError(async () => {
      const validationResponse = getInfluencersInConversationValidator({ conversationId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const [memberIds, membersChatInfo] = await this.conversationRepository.getConversationMembers(
        conversationId,
      );
      // get members details
      const conversationMembers = [];
      const usersResponse = await this.userRepository.getSearchedUsers(memberIds);
      if (usersResponse.status !== 200) throwError(usersResponse.status, usersResponse.message.split(': ')[1]);

      const users = usersResponse.data;
      membersChatInfo.forEach((member) => {
        users.forEach((user) => {
          if (member.userId.toString() === user._id) {
            conversationMembers.push({ ...user, unreadMessages: member.unreadCount });
          }
        });
      });

      return {
        data: conversationMembers,
        message: 'BE: Influencer found in conversation',
      };
    });
  }
}

module.exports = ConversationService;
