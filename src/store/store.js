import { combineReducers } from 'redux';
import { userReducer } from './reducers/userReducer';
import { channelReducer } from './reducers/channelReducer';

const rootReducer = combineReducers({
  user: userReducer,
  channel: channelReducer
});

export default rootReducer;
