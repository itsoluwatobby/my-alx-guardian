/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { throwError } = require('../utils/responseAdapter');
const {
  createCommentValidator, getCommentsValidator,
  likeCommentValidator, updateCommentValidator,
  tagCommentValidator,
} = require('../utils/comment.validator');
const { userRepository } = require('../repositories/user.repository');
const { idValidator } = require('../utils/account.validation');
const { commentRepository } = require('../repositories/comment.respository');
const { postsRepository } = require('../repositories/post.repository');

class CommentService {
  async createComment(commentObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = createCommentValidator(commentObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const post = await postsRepository.updatePost(
        commentObj.postId,
        { $inc: { commentCount: 1 } },
      );
      if (!post) throwError(404, 'Post not found');

      const commenter = await userRepository.getUser(commentObj.userId);
      if (!commenter) throwError(404, 'Account not found');

      const comment = await commentRepository.createComment(commentObj);
      if (!comment) {
        await postsRepository.updatePost(
          commentObj.postId,
          { $inc: { commentCount: post.commentCount > 0 ? -1 : 0 } },
        );
        throwError(400, 'Mongo Error: Error creating comment');
      }
      return {
        data: comment,
        message: 'BE: Comment created successfully',
      };
    });
  }

  async updateComment(commentObj, activeId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = updateCommentValidator(commentObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { id, userId, ...rest } = commentObj;
      if (activeId !== userId) {
        throwError(401, 'You are unauthorised to modify comment');
      }
      const user = await userRepository.getUser(userId);
      if (!user) throwError(404, 'Account not found');
      const comment = await commentRepository.updateComment(id, rest);
      if (!comment) throwError(400, 'Mongo Error: Error updating comment');
      return {
        data: comment,
        message: 'BE: Comment updated successfully',
      };
    });
  }

  async toggleLike(commentObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = likeCommentValidator(commentObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { id, userId } = commentObj;
      const user = await userRepository.getUser(userId);
      if (!user) throwError(404, 'Account not found');
      const result = await commentRepository.like_UnlikeCommemt(id, userId);
      if (!result.comment) throwError(400, 'Mongo Error: Error modifying comment');
      return {
        data: result.comment,
        message: `BE: ${result.message}`,
      };
    });
  }

  async tagComment(commentObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = tagCommentValidator(commentObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const post = await postsRepository.getPost(commentObj.postId);
      if (!post) throwError(404, 'Post not found');

      const user = await userRepository.getUser(commentObj.userId);
      if (!user) throwError(404, 'Account not found');
      const comment = await commentRepository.tagComment(commentObj);
      if (!comment) throwError(400, 'Mongo Error: Error creating comment');
      return {
        data: comment,
        message: 'BE: Comment tagged',
      };
    });
  }

  async getComment(commentObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await idValidator({ id: commentObj.commentId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { commentId } = commentObj;
      const comment = await commentRepository.getComment(commentId);
      if (!comment) throwError(404, 'Comment not found');
      return {
        data: comment,
        message: 'BE: Comment retrieved',
      };
    });
  }

  async getComments(commentQuery) {
    return tryCatchWrapperWithError(async () => {
      const { pageNumber, limit, postId } = commentQuery;
      const validationResponse = getCommentsValidator({ pageNumber, limit, postId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const comments = await commentRepository.getComments(commentQuery);
      return {
        data: comments,
        message: 'BE: Comments retrieved successfully',
      };
    });
  }

  async deleteComment(commentObj, activeId) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = await idValidator(commentObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { id } = commentObj;
      const comment = await commentRepository.getComment(id);
      if (!comment) throwError(404, 'Comment not found');
      if (activeId !== comment.userId.toString()) {
        throwError(401, 'You are unauthorised to modify comment');
      }
      const deletedComment = await commentRepository.deleteComment({ _id: id });
      if (!deletedComment) throwError(404, 'Error deleting comment');
      return {
        data: deletedComment._id,
        message: 'BE: Comment deleted',
      };
    });
  }
}

module.exports = CommentService;
