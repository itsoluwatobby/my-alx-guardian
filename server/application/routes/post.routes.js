/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const postRoute = require('express').Router();
const PostController = require('../controllers/post.controllers');

postRoute.post('/create-post', (req, res) => PostController.createPost(req, res));
// postRoute.get('/get-posts', (req, res) => PostController.getPosts(req, res));
// postRoute.get('/get/:postId', (req, res) => PostController.getPost(req, res));
postRoute.put('/update', (req, res) => PostController.updatePost(req, res));
postRoute.patch('/toggle-like', (req, res) => PostController.toggleLike(req, res));
postRoute.put('/share-post', (req, res) => PostController.sharepost(req, res));
postRoute.put('/repost', (req, res) => PostController.repost(req, res));
postRoute.post('/delete', (req, res) => PostController.deletePost(req, res));
// postRoute.get('/search', (req, res) => PostController.getSearchedPosts(req, res));

module.exports = postRoute;
