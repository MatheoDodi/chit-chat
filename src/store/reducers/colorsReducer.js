import * as actionTypes from '../actions/actionTypes';

const initialState = {
  primaryColor: '#5F4B8B',
  secondaryColor: '#eee'
};

export const colorsReducer = (state = initialState, action) => {
  console.log('reducer');
  switch (action.type) {
    case actionTypes.SET_COLORS:
      return {
        ...state,
        primaryColor: action.payload.primaryColor,
        secondaryColor: action.payload.secondaryColor
      };
    default:
      return state;
  }
};
