import { HTTP_METHOD } from "../config";

export const AUTH = {
  signin: {
    method: HTTP_METHOD.POST,
    url: '/auth/signin'
  },
  register: {
    method: HTTP_METHOD.POST,
    url: '/auth/register'
  },
  accountActivation: {
    method: HTTP_METHOD.POST,
    url: '/auth/accountActivation'
  },
  signout: {
    method: HTTP_METHOD.POST,
    url: '/auth/signout'
  },
  forgotPassword: {
    method: HTTP_METHOD.POST,
    url: '/auth/forgotPassword'
  },
  passwordReset: {
    method: HTTP_METHOD.PUT,
    url: '/auth/passwordReset'
  },
  resendOTP: {
    method: HTTP_METHOD.POST,
    url: '/auth/resendOTP'
  },
  verifyOTP: {
    method: HTTP_METHOD.PUT,
    url: '/auth/verifyOTP'
  },
};
