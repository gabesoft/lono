import { apiGet } from 'client/actions/apiHelper';

import type { Post } from 'client/types/Post';
import type { ReduxState } from 'client/types/ReduxState';

export const invalidatePosts = () => {
  return { type: 'INVALIDATE_POSTS' };
};

export const requestPosts = () => {
  return { type: 'REQUEST_POSTS' };
};

export const receivePosts = (json: Array<Post>) => {
  return {
    type: 'RECEIVE_POSTS',
    posts: json,
    receivedAt: Date.now()
  };
};

const fetchPosts = () => apiGet('posts', requestPosts, receivePosts, invalidatePosts);

const shouldFetchPosts = (state: ReduxState) => {
  const posts = state.posts;
  const auth = state.auth;

  if (!auth.isInitialized) {
    return false;
  } else if (!posts || !posts.items.length) {
    return true;
  } else if (posts.isFetching) {
    return false;
  }
  return posts.didInvalidate;
}

export const fetchPostsIfNeeded = () => {
  return (dispatch: Function, getState: () => ReduxState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  };
};
