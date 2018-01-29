import type { PostsAction } from 'client/types/PostsAction';
import type { PostsState } from 'client/types/PostsState';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

const post = (state: PostsState = initialState, action: PostsAction) => {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdate: action.receivedAt
      });
    case 'REQUEST_POSTS':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'INVALIDATE_POSTS':
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state;
  }
};

export default post;