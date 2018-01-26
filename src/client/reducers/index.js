import { combineReducers } from 'redux';

import auth from 'client/reducers/auth';

const reducers = {
  auth
};

export type Reducers = typeof reducers;

export default combineReducers(reducers);
