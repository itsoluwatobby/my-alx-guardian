import { HTTP_METHOD } from "../config";

export const POST = {
  create: {
    method: HTTP_METHOD.POST,
    url: '/post/create-post',
  },
  getPosts: {
    method: HTTP_METHOD.GET,
    url: '/post/get-posts',
  },
  get: {
    method: HTTP_METHOD.GET,
    url: '/post/get', // :postId
  },
  update: {
    method: HTTP_METHOD.PUT,
    url: '/post/update',
  },
  toggleLike: {
    method: HTTP_METHOD.PATCH,
    url: '/post/toggle-like',
  },
  share: {
    method: HTTP_METHOD.PUT,
    url: '/post/share-post',
  },
  repost: {
    method: HTTP_METHOD.PUT,
    url: '/post/repost',
  },
  deletePost: {
    method: HTTP_METHOD.POST,
    url: '/post/delete',
  },
  search: {
    method: HTTP_METHOD.GET,
    url: '/post/search',
  },
} as const;
