import type { PostsAction } from 'types/PostsAction';
import type { PostsState } from 'types/PostsState';

const initialState = {
  isFetching: false,
  hasMore: true,
  didInvalidate: false,
  page: 1,
  items: []
};

const post = (state: PostsState = initialState, action: PostsAction) => {
  switch (action.type) {
    case 'RECEIVE_POSTS': {
      const posts = action.posts || [];
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        page: 1,
        hasMore: posts.length > 0,
        items: posts,
        lastUpdate: action.receivedAt
      });
    }
    case 'RECEIVE_MORE_POSTS': {
      const posts = action.posts || [];
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        hasMore: posts.length > 0,
        items: state.items.concat(posts),
        page: action.page,
        lastUpdate: action.receivedAt
      });
    }
    case 'REQUEST_POSTS': {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    }
    case 'INVALIDATE_POSTS': {
      return Object.assign({}, state, {
        didInvalidate: true
      });
    }
    default:
      return state;
  }
};

export default post;
