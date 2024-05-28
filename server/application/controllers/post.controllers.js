/* eslint-disable class-methods-use-this */
const PostService = require('../services/post.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class PostController {
  postService = new PostService();

  createPost(req, res) {
    return tryCatchWrapper(res, async () => {
      const posts = await this.postService.createPost(req.body);
      return res.json(response.success(posts.data, posts.message));
    });
  }

  getPosts(req, res) {
    return tryCatchWrapper(res, async () => {
      const posts = await this.postService.getPosts(req.query);
      return res.json(response.success(posts.data, posts.message));
    });
  }

  getSearchedPosts(req, res) {
    return tryCatchWrapper(res, async () => {
      const posts = await this.postService.getSearchedPosts(req.query.search);
      return res.json(response.success(posts.data, posts.message));
    });
  }

  getPost(req, res) {
    return tryCatchWrapper(res, async () => {
      const post = await this.postService.getPost(req.params);
      return res.json(response.success(post.data, post.message));
    });
  }

  updatePost(req, res) {
    return tryCatchWrapper(res, async () => {
      const post = await this.postService.updatePost(req.body, req.query.activeId);
      return res.json(response.success(post.data, post.message));
    });
  }

  toggleLike(req, res) {
    return tryCatchWrapper(res, async () => {
      const post = await this.postService.toggleLike(req.body);
      return res.json(response.success(post.data, post.message));
    });
  }

  sharepost(req, res) {
    return tryCatchWrapper(res, async () => {
      const post = await this.postService.sharepost(req.body);
      return res.json(response.success(post.data, post.message));
    });
  }

  repost(req, res) {
    return tryCatchWrapper(res, async () => {
      const post = await this.postService.repost(req.body);
      return res.json(response.success(post.data, post.message));
    });
  }

  deletePost(req, res) {
    return tryCatchWrapper(res, async () => {
      const post = await this.postService.deletePost(req.params, req.query.activeId);
      return res.json(response.success(post.data, post.message));
    });
  }
}

module.exports = new PostController();
