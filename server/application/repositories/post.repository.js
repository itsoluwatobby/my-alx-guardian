/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
const { PostsModel, SharesModel } = require('../models');
const { CategoryEnum } = require('../utils/accountEnum');
const { pagination } = require('../utils/paginate');
const { commentRepository } = require('./comment.respository');

class PostsRepository {
  constructor() {
    this.commentRepository = commentRepository;
  }

  async getPost(id) {
    const post = await PostsModel.findById(id);
    return post;
  }

  async getPosts(queryObj) {
    const {
      activeId, pageNumber, limit, ...query
    } = queryObj;
    let ref;
    let posts;
    if (Object.keys(query).includes('type')) {
      const { type, ...rest } = query;
      if (type === CategoryEnum.General) {
        const { General, Forums, Cohorts } = CategoryEnum;
        ref = {
          'category.type': { $in: [General, Forums, Cohorts] },
        };
      } else ref = { 'category.type': type, ...rest };
      posts = await pagination(pageNumber, limit, PostsModel, ref);
    } else {
      posts = await pagination(pageNumber, limit, PostsModel, query);
    }
    return posts;
  }

  async getSearchedPosts(query) {
    const caseInsensitiveQuery = new RegExp(query, 'i');
    const posts = await PostsModel.find({
      $or: [
        { body: { $in: [caseInsensitiveQuery] } },
        { 'category.type': { $in: [caseInsensitiveQuery] } },
        { 'category.name': { $in: [caseInsensitiveQuery] } },
      ],
    });
    return posts;
  }

  async engagedPosts(query) {
    const posts = await PostsModel.find({
      $or: [
        { userId: { $in: [query] } },
        { likes: { $in: [query] } },
        { 'reposts.userId': { $in: [query] } },
      ],
    });
    return posts;
  }

  async updatePost(id, postObj) {
    const result = await PostsModel.findOneAndUpdate({ _id: id }, postObj, { new: true });
    return result;
  }

  async createPost(newPostObj) {
    const result = await PostsModel.create(newPostObj);
    return result;
  }

  async like_UnlikePost(postObj) {
    const { postId, userId } = postObj;
    const post = await this.getPost(postId);
    let result;
    let message;
    if (!post.likes.includes(userId)) {
      result = await PostsModel.findOneAndUpdate(
        { _id: postId },
        { $push: { likes: userId } },
        { new: true },
      );
      message = 'Post liked';
    } else {
      result = await PostsModel.findOneAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } },
        { new: true },
      );
      message = 'Post unliked';
    }
    return { message, post: result };
  }

  async sharePost(postObj) {
    const { postId, userId, platform } = postObj;
    await SharesModel.create(
      { userId, postId, platform },
    );
    const result = await this.updatePost(postId, { $inc: { sharedCount: 1 } });
    return result;
  }

  async repost(postObj) {
    const { postId, userId } = postObj;
    const post = await PostsModel.findById(postId).select('body _id, picture category reposts');
    const { _id, reposts, ...rest } = post._doc;
    const createRepost = {
      ...rest, repostId: _id, isRepost: true, userId,
    };
    const repost = await this.createPost(createRepost);
    post.reposts.push({ repostId: repost._id, userId });
    await post.save();
    return repost;
  }

  async deletePost(query) {
    await this.commentRepository.deleteAllComments({ postId: query });
    const result = await PostsModel.findOneAndDelete({ _id: query });
    return result;
  }

  async deleteAllPosts(userId) {
    const result = await PostsModel.deleteMany({ userId });
    await this.commentRepository.deleteAllComments({ userId });
    return result;
  }
}

exports.postsRepository = new PostsRepository();
