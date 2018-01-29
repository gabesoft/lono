import { refreshAuth } from 'client/actions/auth';

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

const fetchPosts = () => {
  const doFetchPosts = async (dispatch: Function, getState: () => ReduxState) => {
    const state = getState();
    const auth = state.auth;
    if (!auth.isAuthenticated) {
      return;
    }

    const idToken = auth.idToken;
    const url = '/api/posts';
    const headers = new Headers({
      Authorization: `Bearer ${idToken || ''}`
    });
    const options = {
      method: 'GET',
      headers: headers
    };

    dispatch(requestPosts());

    const response = await fetch(url, options);
    if (response.ok) {
      const json = await response.json();
      dispatch(receivePosts(json));
    } else if (response.status === 401 && auth.isAuthenticated) {
      dispatch(refreshAuth());
      dispatch(invalidatePosts());
    }
  };

  return doFetchPosts;
}

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
