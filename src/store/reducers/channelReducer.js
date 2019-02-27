import * as actionTypes from '../actions/actionTypes';

const initialState = {
  currentChannel: null,
  isPrivateChannel: false,
  userPosts: null
};

export const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.channel
      };
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
        ...state,
        isPrivateChannel: action.payload.isPrivateChannel
      };
    case actionTypes.SET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload.userPosts
      };
    default:
      return state;
  }
};
