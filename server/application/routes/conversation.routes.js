/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const conversationRoute = require('express').Router();
const ConversationController = require('../controllers/conversation.controllers');

conversationRoute.post('/create-conversation', (req, res) => ConversationController.createConversation(req, res));
conversationRoute.post('/create-chat', (req, res) => ConversationController.createChat(req, res));
conversationRoute.get('/get', (req, res) => ConversationController.getConversation(req, res));
conversationRoute.patch('/end-conversation', (req, res) => ConversationController.endConversation(req, res));

module.exports = conversationRoute;
