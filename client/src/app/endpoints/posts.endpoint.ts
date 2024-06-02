import { HTTP_METHOD } from "../config";

export const POST = {
  create: {
    method: HTTP_METHOD.POST,
    url: '/post/create-post',
  },
  getPosts: {
    method: HTTP_METHOD.GET,
    url: '/public/get-posts', //  -- public url
  },
  get: {
    method: HTTP_METHOD.GET,
    url: '/public/get', // :postId  -- public url
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
    url: '/public/search',  //  -- public url
  },
} as const;
