import { combineReducers } from 'redux';

import auth from 'client/reducers/auth';
import posts from 'client/reducers/posts';

const reducers = {
  auth,
  posts
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
