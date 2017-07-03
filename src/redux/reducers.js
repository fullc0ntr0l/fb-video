import { combineReducers } from 'redux';
import fbReducer from './facebook';

export default combineReducers({
  facebook: fbReducer,
});
