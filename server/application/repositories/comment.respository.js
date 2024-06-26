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
    const { id, ...rest } = commentObj;
    const newComment = await this.createComment(rest);
    await CommentModel.findOneAndUpdate(
      { _id: id },
      { $push: { tags: { userId: rest.userId, responseId: newComment._id } } },
    );
    return newComment;
  }

  async createComment(newCommentObj) {
    const result = await CommentModel.create(newCommentObj);
    return result;
  }

  async like_UnlikeCommemt(id, userId) {
    const post = await this.getComment(id);
    let result;
    let message;
    if (!post.likes.includes(userId)) {
      result = await CommentModel.findOneAndUpdate(
        { _id: id },
        { $push: { likes: userId } },
        { new: true },
      );
      message = 'Comment liked';
    } else {
      result = await CommentModel.findOneAndUpdate(
        { _id: id },
        { $pull: { likes: userId } },
        { new: true },
      );
      message = 'Comment unliked';
    }
    return { message, comment: result };
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
