import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';
import { notify } from '../utils/feedback';

export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: AUTH, data });
    notify(`Welcome back${data?.result?.name ? `, ${data.result.name.split(' ')[0]}` : ''}.`, 'success');
    router.push('/');
  } catch (error) {
    throw error;
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    dispatch({ type: AUTH, data });
    notify('Your account is ready.', 'success');
    router.push('/');
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = (formData, router) => async () => {
  try {
    const { data } = await api.forgotPassword(formData);
    notify(data.message, 'success');
    router.push('/auth');
  } catch (error) {
    throw error;
  }
};
