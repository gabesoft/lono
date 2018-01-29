import { combineReducers } from 'redux';

import auth from 'client/reducers/auth';
import posts from 'client/reducers/posts';
import { feeds, subscriptions } from 'client/reducers/feeds';

const reducers = {
  auth,
  posts,
  feeds,
  subscriptions
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
