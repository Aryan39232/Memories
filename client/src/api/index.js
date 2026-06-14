import axios from 'axios';

import { startRequest, endRequest, notify } from '../utils/feedback';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000' });

// Attach auth token + start the global progress bar on every request.
API.interceptors.request.use(
  (req) => {
    startRequest();
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  },
  (error) => {
    endRequest();
    return Promise.reject(error);
  },
);

// Stop the progress bar; surface backend error messages as a toast.
API.interceptors.response.use(
  (res) => {
    endRequest();
    return res;
  },
  (error) => {
    endRequest();
    const status = error?.response?.status;
    const serverMsg = error?.response?.data?.message;
    let message = serverMsg || error?.message || 'Something went wrong. Please try again.';
    if (!serverMsg) {
      if (error?.code === 'ERR_NETWORK') message = "Can't reach the server. Check your connection and try again.";
      else if (status === 401 || status === 403) message = 'Your session has expired. Please sign in again.';
      else if (status >= 500) message = 'The server ran into a problem. Please try again shortly.';
    }
    notify(message, 'error');
    return Promise.reject(error);
  },
);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPostsByCreator = (name, page) => API.get(`/posts/creator?name=${name}&page=${page || 1}`);
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || ''}&page=${searchQuery.page || 1}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const forgotPassword = (formData) => API.post('/user/forgot-password', formData);
