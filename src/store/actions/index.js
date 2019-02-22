import * as actionTypes from './actionTypes';

export const setUser = user => ({
  type: actionTypes.SET_USER,
  payload: {
    currentUser: user
  }
});

export const clearUser = () => ({
  type: actionTypes.CLEAR_USER
});

export const setCurrentChannel = channel => ({
  type: actionTypes.SET_CURRENT_CHANNEL,
  payload: {
    channel
  }
});
