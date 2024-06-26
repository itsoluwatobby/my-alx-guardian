import axios from 'axios';
import { isProd } from '../utility/helpers';
import localStore from '../utility/localStorage';

const DEPLOYED_LINK = 'https://my-alx-guardian-service.onrender.com/v1';
// const LOCAL_LINK = 'http://localhost:3500/v1';

export const BASEURL = isProd ? DEPLOYED_LINK : DEPLOYED_LINK;

export const guardianAPI = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
  }
})

export const guardianAuthenticatedAPI = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_X_API_KEY,
    "Authorization": `Bearer ${localStore.getStorage('token')}`
  }
})

export const HTTP_METHOD = {
  POST: 'post',
  PUT: 'put',
  PATCH: 'patch',
  GET: 'get',
  DELETE: 'delete',
} as const;
