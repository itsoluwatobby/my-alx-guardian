/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { messagesRepository } = require('../repositories/messages.repository');
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { getMessagesValidator, messageIdValidator } = require('../utils/message.validator');
// const { throwError } = require('../utils/responseAdapter');

class MessagesService {
  constructor() {
    this.messagesRepository = messagesRepository;
  }

  // async createMessage(newMessage) {
  //   return tryCatchWrapperWithError(async () => {
  //     const validationResponse = createMessageValidator(newMessage);
  //     if (!validationResponse.valid) {
  //       throw new Error(validationResponse.error);
  //     }
  //     const message = await this.messagesRepository.createMessage(newMessage);
  //     if (!message) throwError(400, 'Mongo Error- Error creating message');
  //     return {
  //       data: message,
  //       message: 'BE: Message created successfully',
  //     };
  //   });
  // }

  async getMessages(conversationId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = getMessagesValidator({ conversationId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const messages = await this.messagesRepository.getMessages(conversationId);
      return {
        data: messages,
        message: 'BE: Messages retrieved successfully',
      };
    });
  }

  async getMessage(messageId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = messageIdValidator({ messageId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const message = await this.messagesRepository.getMessage(messageId);
      return {
        data: message,
        message: 'BE: Message retrieved successfully',
      };
    });
  }

  async messageDelivered(messageId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = messageIdValidator({ messageId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const message = await this.messagesRepository.isMessageDelivered(messageId);
      return { data: message, message: 'BE: Message delivered' };
    });
  }
}

module.exports = MessagesService;
