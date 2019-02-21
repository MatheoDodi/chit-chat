import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentUser: null,
  isLoading: true
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload.currentUser
      };
    default:
      return state;
  }
};
