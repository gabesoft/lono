import authService from 'client/services/auth';

import {
  authSetInfo,
  authClear
} from 'client/actions/auth';

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
  const doFetchPosts = async (dispatch: Function, getState: () => ReduxState, tryCount: number = 0) => {
    dispatch(requestPosts());

    const state = getState();
    const idToken = state.auth.idToken;
    const url = '/api/posts';
    const headers = new Headers({
      Authorization: `Bearer ${idToken || ''}`
    });
    const options = {
      method: 'GET',
      headers: headers
    };

    const response = await fetch(url, options);
    if (response.ok) {
      const json = await response.json();
      dispatch(receivePosts(json));
    } else if (response.status === 401 && tryCount < 5) {
      // TODO: maybe move this to the auth actions (create anothe action)

      // TODO: clear auth on refresh-failure

      authService.once('refresh-success', () => {
        dispatch(authSetInfo(authService.authInfo));
        // TODO: try only invalidating posts here, if so we need to add the try count to state
        doFetchPosts(dispatch, getState, tryCount + 1);
      });

      authService.refresh();
    }
  };

  return doFetchPosts;
};

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
