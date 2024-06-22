/* eslint-disable class-methods-use-this */
const ConversationRepository = require('../services/conversation.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class ConversationController {
  constructor() {
    this.conversationRepository = new ConversationRepository();
  }

  createConversation(req, res) {
    return tryCatchWrapper(res, async () => {
      const conversation = await this.conversationRepository.createConversation(req.body);
      return res.json(response.success(conversation.data, conversation.message));
    });
  }

  createChat(req, res) {
    return tryCatchWrapper(res, async () => {
      const chat = await this.conversationRepository.createChat(req.body);
      return res.json(response.success(chat.data, chat.message));
    });
  }

  getConversation(req, res) {
    return tryCatchWrapper(res, async () => {
      const conversation = await this.conversationRepository.getConversation(req.query);
      return res.json(response.success(conversation.data, conversation.message));
    });
  }

  endConversation(req, res) {
    return tryCatchWrapper(res, async () => {
      const conversation = await this.conversationRepository.endConversation(req.query);
      return res.json(response.success(conversation.data, conversation.message));
    });
  }

  getConverstionsByUser(req, res) {
    return tryCatchWrapper(res, async () => {
      const conversations = await this.conversationRepository.getConverstionsByUser(
        req.query.activeId,
      );
      return res.json(response.success(conversations));
    });
  }

  addInfluencerToConversation(req, res) {
    return tryCatchWrapper(res, async () => {
      const conversation = await this.conversationRepository.addInfluencerToConversation(
        req.body,
      );
      return res.json(response.success(conversation.data, conversation.message));
    });
  }

  getConversationMembers(req, res) {
    return tryCatchWrapper(res, async () => {
      const conversation = await this.conversationRepository.getConversationMembers(
        req.query,
      );
      return res.json(response.success(conversation.data, conversation.message));
    });
  }
}

module.exports = new ConversationController();
