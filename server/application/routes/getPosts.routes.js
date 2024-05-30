/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const getPostRoute = require('express').Router();
const PostController = require('../controllers/post.controllers');

getPostRoute.get('/get-posts', (req, res) => PostController.getPosts(req, res));
getPostRoute.get('/get/:postId', (req, res) => PostController.getPost(req, res));

module.exports = getPostRoute;
