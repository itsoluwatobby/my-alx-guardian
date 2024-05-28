/* eslint-disable class-methods-use-this */
const CommentService = require('../services/comment.services');
const { tryCatchWrapper } = require('../utils/asyncWrapper');
const response = require('../utils/responseAdapter');

class CommentController {
  commentService = new CommentService();

  createComment(req, res) {
    return tryCatchWrapper(res, async () => {
      const comments = await this.commentService.createComment(req.body);
      return res.json(response.success(comments.data, comments.message));
    });
  }

  getComments(req, res) {
    return tryCatchWrapper(res, async () => {
      const comments = await this.commentService.getComments(req.query);
      return res.json(response.success(comments.data, comments.message));
    });
  }

  getComment(req, res) {
    return tryCatchWrapper(res, async () => {
      const comment = await this.commentService.getComment(req.params);
      return res.json(response.success(comment.data, comment.message));
    });
  }

  updateComment(req, res) {
    return tryCatchWrapper(res, async () => {
      const comment = await this.commentService.updateComment(req.body, req.query.activeId);
      return res.json(response.success(comment.data, comment.message));
    });
  }

  toggleLike(req, res) {
    return tryCatchWrapper(res, async () => {
      const comment = await this.commentService.toggleLike(req.body);
      return res.json(response.success(comment.data, comment.message));
    });
  }

  tagComment(req, res) {
    return tryCatchWrapper(res, async () => {
      const comment = await this.commentService.tagComment(req.body);
      return res.json(response.success(comment.data, comment.message));
    });
  }

  deleteComment(req, res) {
    return tryCatchWrapper(res, async () => {
      const comment = await this.commentService.deleteComment(req.params, req.query.activeId);
      return res.json(response.success(comment.data, comment.message));
    });
  }
}

module.exports = new CommentController();
