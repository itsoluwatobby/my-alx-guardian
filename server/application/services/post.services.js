/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { tryCatchWrapperWithError } = require('../utils/asyncWrapper');
const { throwError } = require('../utils/responseAdapter');
const {
  createPostValidator, updatePostValidator, getPostsValidator,
  likePostValidator, postModificationValidator, sharePostValidator,
} = require('../utils/post.validator');
const { userRepository } = require('../repositories/user.repository');
const { idvalidator } = require('../utils/account.validation');
const { postsRepository } = require('../repositories/post.repository');

class PostService {
  async createPost(postObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = createPostValidator(postObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const poster = await userRepository.getUser(postObj.userId);
      if (!poster) throwError(404, 'Account not found');
      const post = await postsRepository.createPost(postObj);
      if (!post) throwError(400, 'Mongo Error: Error creating post');
      return {
        data: post,
        message: 'BE: Post created successfully',
      };
    });
  }

  async updatePost(req) {
    const postObj = req.body;
    return tryCatchWrapperWithError(async () => {
      const validationResponse = updatePostValidator(postObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { id, userId, ...rest } = postObj;
      if (req.query.activeId !== userId) {
        throwError(401, 'You are unauthorised to modify post');
      }
      const user = await userRepository.getUser(userId);
      if (!user) throwError(404, 'Account not found');
      const post = await postsRepository.updatePost(id, rest);
      if (!post) throwError(400, 'Mongo Error: Error updating post');
      return {
        data: post,
        message: 'BE: Post updated successfully',
      };
    });
  }

  async toggleLike(postObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = likePostValidator(postObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }

      const { postId, userId } = postObj;
      const user = await userRepository.getUser(userId);
      if (!user) throwError(404, 'Account not found');

      const result = await postsRepository.like_UnlikePost({ postId, userId });
      if (!result.post) throwError(400, 'Mongo Error: Error modifying post');
      return {
        data: result.post,
        message: `BE: ${result.message}`,
      };
    });
  }

  async getPost(postObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = idvalidator({ id: postObj.postId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { postId } = postObj;
      const post = await postsRepository.getPost(postId);
      if (!post) throwError(404, 'Post not found');
      return {
        data: post,
        message: 'BE: Post found',
      };
    });
  }

  async getPosts(postQuery) {
    return tryCatchWrapperWithError(async () => {
      const { pageNumber, limit } = postQuery;
      const validationResponse = getPostsValidator({ pageNumber, limit });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const posts = await postsRepository.getPosts(postQuery);
      return {
        data: posts,
        message: 'BE: Posts retrieved successfully',
      };
    });
  }

  async getSearchedPosts(postQuery) {
    return tryCatchWrapperWithError(async () => {
      if (postQuery) throwError(400, 'postQuery required');
      const posts = await postsRepository.getSearchedPosts(postQuery);
      return {
        data: posts,
        message: 'BE: Posts retrieved successfully',
      };
    });
  }

  async repost(postObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = postModificationValidator(postObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { postId } = postObj;
      const post = await postsRepository.getPost(postId);
      if (!post) throwError(404, 'Post not found');
      const postRepost = await postsRepository.repost(postObj);
      return {
        data: postRepost,
        message: 'BE: Post reposted',
      };
    });
  }

  async sharepost(postObj) {
    return tryCatchWrapperWithError(async () => {
      const validationResponse = sharePostValidator(postObj);
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { postId } = postObj;
      const post = await postsRepository.getPost(postId);
      if (!post) throwError(404, 'Post not found');
      await postsRepository.sharePost(postObj);
      return {
        data: {
          status: true,
        },
        message: 'BE: Post shared successfully',
      };
    });
  }

  async deletePost(req) {
    const postObj = req.body;
    return tryCatchWrapperWithError(async () => {
      const validationResponse = idvalidator({ id: postObj.postId });
      if (!validationResponse.valid) {
        throw new Error(validationResponse.error);
      }
      const { postId } = postObj;
      const post = await postsRepository.getPost(postId);
      if (!post) throwError(404, 'Post not found');
      if (req.query.activeId !== post.userId.toString()) {
        throwError(401, 'You are unauthorised to modify post');
      }
      const deletedPost = await postsRepository.deletePost({ postId });
      if (!deletedPost) throwError(404, 'Error deleting post');
      return {
        data: deletedPost._id,
        message: 'BE: Post deleted',
      };
    });
  }
}

module.exports = PostService;
