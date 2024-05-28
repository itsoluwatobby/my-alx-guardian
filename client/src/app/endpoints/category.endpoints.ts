import { HTTP_METHOD } from "../config";

export const CATEGORY = {
  create: {
    method: HTTP_METHOD.POST,
    url: '/category/create-category',
  },
  getCategoris: {
    method: HTTP_METHOD.GET,
    url: '/category/get-categories',
  },
  get: {
    method: HTTP_METHOD.GET,
    url: '/category/get', // :categoryId
  },
  getMembers: {
    method: HTTP_METHOD.GET,
    url: '/category/members', // :categoryId
  },
  update: {
    method: HTTP_METHOD.PUT,
    url: '/category/update',
  },
  updateDescription: {
    method: HTTP_METHOD.PUT,
    url: '/category/update-description',
  },
  joinOrLeaveCategory: {
    method: HTTP_METHOD.PUT,
    url: '/category/join-leave-category',
  },
  deleteCategory: {
    method: HTTP_METHOD.POST,
    url: '/category/delete',
  },
  search: {
    method: HTTP_METHOD.GET,
    url: '/category/search',
  },
}