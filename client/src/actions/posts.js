import { START_LOADING, END_LOADING, FETCH_ALL, FETCH_POST, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, COMMENT, FETCH_BY_CREATOR } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { notify } from '../utils/feedback';

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(id);
    dispatch({ type: FETCH_POST, payload: { post: data } });
  } catch (error) {
    notify('Could not load this memory. Please try again.', 'error');
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages } });
  } catch (error) {
    notify('Could not load memories. Please check your connection.', 'error');
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const getPostsByCreator = (name, page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPostsByCreator(name, page);
    dispatch({ type: FETCH_BY_CREATOR, payload: { data, currentPage, numberOfPages } });
  } catch (error) {
    notify('Could not load your memories. Please try again.', 'error');
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPostsBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: { data, currentPage, numberOfPages } });
  } catch (error) {
    notify('Search failed. Please try again.', 'error');
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    notify('Memory shared.', 'success');
    history.push(`/posts/${data._id}`);
  } catch (error) {
    throw error;
  } finally {
    dispatch({ type: END_LOADING });
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
    notify('Changes saved.', 'success');
  } catch (error) {
    throw error;
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    throw error;
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);
    dispatch({ type: COMMENT, payload: data });
    notify('Comment added.', 'success');
    return data.comments;
  } catch (error) {
    throw error;
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    notify('Memory deleted.', 'success');
  } catch (error) {
    throw error;
  }
};
