import * as actionTypes from './actionTypes';

export const setUser = user => ({
  type: actionTypes.SET_USER,
  payload: {
    currentUser: user
  }
});
