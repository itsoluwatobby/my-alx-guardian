/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const publicRoute = require('express').Router();
const PostController = require('../controllers/post.controllers');
const CommentController = require('../controllers/comment.controllers');
const CategoryController = require('../controllers/category.controllers');
const UserController = require('../controllers/user.controllers');

// users
publicRoute.get('/get/:userId', (req, res) => UserController.getUser(req, res));

// posts
publicRoute.get('/get-posts', (req, res) => PostController.getPosts(req, res));
publicRoute.get('/get/:postId', (req, res) => PostController.getPost(req, res));
publicRoute.get('/search', (req, res) => PostController.getSearchedPosts(req, res));

// coments
publicRoute.get('/get-comments', (req, res) => CommentController.getComments(req, res));

// categories
publicRoute.get('/get-categories', (req, res) => CategoryController.getCategories(req, res));
publicRoute.get('/get/:categoryId', (req, res) => CategoryController.getCategory(req, res));
publicRoute.get('/search', (req, res) => CategoryController.getSearchedCategories(req, res));

module.exports = publicRoute;
