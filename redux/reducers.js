import { combineReducers } from 'redux';
import music from './music/reducer';
// import auth from './auth/reducer';

const reducers = combineReducers({
  music
});

export default reducers;
