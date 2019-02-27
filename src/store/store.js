import { combineReducers } from 'redux';
import { userReducer } from './reducers/userReducer';
import { channelReducer } from './reducers/channelReducer';
import { colorsReducer } from './reducers/colorsReducer';

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer,
  colors: colorsReducer
});

export default rootReducer;
