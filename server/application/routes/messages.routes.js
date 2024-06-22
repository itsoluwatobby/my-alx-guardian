/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const messagesRoute = require('express').Router();
const MessagesController = require('../controllers/messages.controllers');

// messagesRoute.post('/create', (req, res) => MessagesController.createMessage(req, res));
messagesRoute.get('/get', (req, res) => MessagesController.getMessage(req, res));
messagesRoute.get('/messages', (req, res) => MessagesController.getMessages(req, res));

module.exports = messagesRoute;
