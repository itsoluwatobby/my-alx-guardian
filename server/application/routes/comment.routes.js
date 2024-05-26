/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const commentRoute = require('express').Router();
const CommentController = require('../controllers/comment.controllers');

commentRoute.post('/create-comment', (req, res) => CommentController.createComment(req, res));
commentRoute.get('/get-comments', (req, res) => CommentController.getComments(req, res));
commentRoute.get('/get/:commentId', (req, res) => CommentController.getComment(req, res));
commentRoute.put('/update', (req, res) => CommentController.updateComment(req, res));
commentRoute.patch('/toggle-like', (req, res) => CommentController.toggleLike(req, res));
commentRoute.put('/tag-comment', (req, res) => CommentController.tagComment(req, res));
commentRoute.delete('/delete', (req, res) => CommentController.deleteComment(req, res));

module.exports = commentRoute;
