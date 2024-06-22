/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const conversationRoute = require('express').Router();
const ConversationController = require('../controllers/conversation.controllers');

conversationRoute.post('/create-conversation', (req, res) => ConversationController.createConversation(req, res));

conversationRoute.post('/create-chat', (req, res) => ConversationController.createChat(req, res));
conversationRoute.get('/get', (req, res) => ConversationController.getConversation(req, res));
conversationRoute.patch('/end-conversation', (req, res) => ConversationController.endConversation(req, res));
conversationRoute.get('/get-conversations-by-user', (req, res) => ConversationController.getConverstionsByUser(req, res));
conversationRoute.patch('/add-influencer-to-conversation', (req, res) => ConversationController.addInfluencerToConversation(req, res));
conversationRoute.get('/get-members-in-conversation', (req, res) => ConversationController.getConversationMembers(req, res));

module.exports = conversationRoute;
