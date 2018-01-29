import type { PostsAction } from 'client/types/PostsAction';
import type { PostsState } from 'client/types/PostsState';

const initialState = {
  isFetching: false,
  hasMore: true,
  didInvalidate: false,
  page: 1,
  items: []
};

const post = (state: PostsState = initialState, action: PostsAction) => {
  switch (action.type) {
    case 'RECEIVE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        page: 1,
        hasMore: action.posts.length > 0,
        items: action.posts,
        lastUpdate: action.receivedAt
      });
    case 'RECEIVE_MORE_POSTS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        hasMore: action.posts.length > 0,
        items: state.items.concat(action.posts),
        page: action.page,
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