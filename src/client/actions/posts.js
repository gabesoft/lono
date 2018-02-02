import {
  apiGet,
  shouldFetchItems,
  fetchItemsIfNeeded
} from 'client/actions/apiHelper';

import type { Post } from 'types/Post';
import type { ReduxState } from 'types/ReduxState';

export const invalidatePosts = () => {
  return { type: 'INVALIDATE_POSTS' };
};

export const requestPosts = () => {
  return { type: 'REQUEST_POSTS' };
};

export const requestMorePosts = () => {
  return { type: 'REQUEST_MORE_POSTS' };
};

export const receivePosts = (json: Array<Post>) => {
  return {
    type: 'RECEIVE_POSTS',
    posts: json,
    receivedAt: Date.now()
  };
};

export const receiveMorePosts = (json: Array<Post>, page: number) => {
  return {
    type: 'RECEIVE_MORE_POSTS',
    posts: json,
    receivedAt: Date.now(),
    page
  };
};

const shouldFetchPosts = (state: ReduxState) => {
  const { items, isFetching, didInvalidate } = state.posts;
  return shouldFetchItems(items, isFetching, didInvalidate);
};

const fetchPosts = () => apiGet('posts', requestPosts, receivePosts);
export const maybeFetchPosts = () => fetchItemsIfNeeded(shouldFetchPosts, fetchPosts);

export const fetchMorePosts = (page: number) => {
  const receive = (json: Array<Post>) => receiveMorePosts(json, page);
  return apiGet(`posts?page=${page}`, requestMorePosts, receive);
}
