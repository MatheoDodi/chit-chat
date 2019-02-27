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

export const setPrivateChannel = isPrivateChannel => ({
  type: actionTypes.SET_PRIVATE_CHANNEL,
  payload: {
    isPrivateChannel
  }
});

export const setUserPosts = userPosts => ({
  type: actionTypes.SET_USER_POSTS,
  payload: {
    userPosts
  }
});
