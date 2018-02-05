
import {
  apiGet,
  shouldFetchItems,
  fetchItemsIfNeeded
} from 'client/actions/apiHelper';

import type { Feed, Subscription } from 'types/Feed';
import type { ReduxState } from 'types/ReduxState';

export const invalidateFeeds = () => {
  return { type: 'INVALIDATE_FEEDS' };
};

export const invalidateSubscriptions = () => {
  return { type: 'INVALIDATE_SUBSCRIPTIONS' };
};

export const requestFeeds = () => {
  return { type: 'REQUEST_FEEDS' };
};

export const requestMoreFeeds = () => {
  return { type: 'REQUEST_MORE_FEEDS' };
};

export const requestSubscriptions = () => {
  return { type: 'REQUEST_SUBSCRIPTIONS' };
};

export const receiveFeeds = (json: Array<Feed>, hasMore: boolean) => {
  return {
    type: 'RECEIVE_FEEDS',
    feeds: json,
    receivedAt: Date.now(),
    hasMore
  };
};

export const receiveSubscriptions = (json: Array<Subscription>) => {
  return {
    type: 'RECEIVE_SUBSCRIPTIONS',
    subscriptions: json,
    receivedAt: Date.now()
  };
};

const shouldFetchFeeds = (state: ReduxState) => {
  const { items, isFetching, didInvalidate } = state.feeds;
  return shouldFetchItems(items, isFetching, didInvalidate);
};

const shouldFetchSubscriptions = (state: ReduxState) => {
  const { items, isFetching, didInvalidate } = state.subscriptions;
  return shouldFetchItems(items, isFetching, didInvalidate);
};

export const receiveMoreFeeds = (json: Array<Feed>, page: number, hasMore: boolean) => {
  return {
    type: 'RECEIVE_MORE_FEEDS',
    feeds: json,
    receivedAt: Date.now(),
    hasMore,
    page
  };
};

const fetchFeeds = () => apiGet('feeds?sort=-lastPostDate&per_page=30', requestFeeds, receiveFeeds);
const fetchSubscriptions = () => apiGet('subscriptions?per_page=9999', requestSubscriptions, receiveSubscriptions);

export const maybeFetchFeeds = () => fetchItemsIfNeeded(shouldFetchFeeds, fetchFeeds);
export const maybeFetchSubscriptions = () => fetchItemsIfNeeded(shouldFetchSubscriptions, fetchSubscriptions);

export const fetchMoreFeeds = (page: number) => {
  const receive = (json: Array<Feed>, hasMore: boolean) => receiveMoreFeeds(json, page, hasMore);
  return apiGet(`feeds?sort=-lastPostDate&per_page=30&page=${page}`, requestMoreFeeds, receive);
};

