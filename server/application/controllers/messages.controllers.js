/* eslint-disable linebreak-style */
/* eslint-disable class-methods-use-this */
const MessagesService = require('../services/messages.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class MessagesController {
  constructor() {
    this.messagesService = new MessagesService();
  }

  // createMessage(req, res) {
  //   return tryCatchWrapper(res, async () => {
  //     const newMessage = await this.messagesService.createMessage(req.body);
  //     return res.json(response.success(newMessage.data, newMessage.message));
  //   });
  // }

  getMessages(req, res) {
    return tryCatchWrapper(res, async () => {
      const messages = await this.messagesService.getMessages(req.query.conversationId);
      return res.json(response.success(messages.data, messages.message));
    });
  }

  getMessage(req, res) {
    return tryCatchWrapper(res, async () => {
      const messages = await this.messagesService.getMessage(req.query.messageId);
      return res.json(response.success(messages.data, messages.message));
    });
  }
}

module.exports = new MessagesController();
