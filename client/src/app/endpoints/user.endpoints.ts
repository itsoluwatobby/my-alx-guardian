import { HTTP_METHOD } from "../config";

export const USER = {
  getUsers: {
    method: HTTP_METHOD.GET,
    url: '/user/get-users',
  },
  get: {
    method: HTTP_METHOD.GET,
    url: '/user/get', // :userId
  },
  update: {
    method: HTTP_METHOD.PUT,
    url: '/user/update',
  },
  deleteUser: {
    method: HTTP_METHOD.POST,
    url: '/user/delete',
  },
};
