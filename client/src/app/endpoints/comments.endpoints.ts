import { HTTP_METHOD } from "../config";

export const COMMENT = {
  create: {
    method: HTTP_METHOD.POST,
    url: '/comment/create-comment',
  },
  getComments: {
    method: HTTP_METHOD.GET,
    url: '/public/get-comments', //  -- public url
  },
  get: {
    method: HTTP_METHOD.GET,
    url: '/comment/get', // :commentId
  },
  update: {
    method: HTTP_METHOD.PUT,
    url: '/comment/update',
  },
  toggleLike: {
    method: HTTP_METHOD.PATCH,
    url: '/comment/toggle-like',
  },
  tagComment: {
    method: HTTP_METHOD.PUT,
    url: '/comment/tag-comment',
  },
  deleteComment: {
    method: HTTP_METHOD.POST,
    url: '/comment/delete',
  },
} as const;
