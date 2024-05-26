/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { CommentModel } = require('../models');
const { pagination } = require('../utils/paginate');

class CommentRepository {
  async getComment(commentId) {
    const comment = await CommentModel.findOne({ _id: commentId });
    return comment;
  }

  async getComments(commentQuery) {
    const { pageNumber, limit, postId } = commentQuery;
    const comments = await pagination(pageNumber, limit, CommentModel, { postId });
    return comments;
  }

  async updateComment(commentId, commentObj) {
    const comment = await CommentModel.findOneAndUpdate(
      { _id: commentId },
      commentObj,
      { new: true },
    );
    return comment;
  }

  async tagComment(commentObj) {
    const { commentId, ...rest } = commentObj;
    const newComment = await this.createComment(rest);
    await CommentModel.findOneAndUpdate(
      { _id: commentId },
      { $push: { tags: { userId: rest.userId, responseId: newComment._id } } },
    );
    return newComment;
  }

  async createComment(newCommentObj) {
    const result = await CommentModel.create(newCommentObj);
    return result;
  }

  async likeComment(postObj) {
    const { commentId, userId } = postObj;
    const result = await CommentModel.findOneAndUpdate(
      { _id: commentId },
      { $push: { likes: userId } },
      { new: true },
    );
    return result;
  }

  async unlikeComment(postObj) {
    const { commentId, userId } = postObj;
    const result = await CommentModel.findOneAndUpdate(
      { _id: commentId },
      { $pull: { likes: userId } },
      { new: true },
    );
    return result;
  }

  async deleteComment(commentId) {
    const result = await CommentModel.findOneAndDelete({ _id: commentId });
    return result;
  }

  async deleteAllComments(query) {
    const result = await CommentModel.deleteMany(query);
    return result;
  }
}

exports.commentRepository = new CommentRepository();
