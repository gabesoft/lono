import {
  apiGet,
  shouldFetchItems,
  fetchItemsIfNeeded
} from 'client/actions/apiHelper';

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

const shouldFetchPosts = (state: ReduxState) => {
  const { items, isFetching, didInvalidate } = state.posts;
  return shouldFetchItems(items, isFetching, didInvalidate);
};

const fetchPosts = () => apiGet('posts', requestPosts, receivePosts, invalidatePosts);
export const maybeFetchPosts = () => fetchItemsIfNeeded(shouldFetchPosts, fetchPosts);
