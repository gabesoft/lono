
import {
  apiGet,
  shouldFetchItems,
  fetchItemsIfNeeded
} from 'client/actions/apiHelper';

import type { Feed, Subscription } from 'client/types/Feed';
import type { ReduxState } from 'client/types/ReduxState';

export const invalidateFeeds = () => {
  return { type: 'INVALIDATE_FEEDS' };
};

export const invalidateSubscriptions = () => {
  return { type: 'INVALIDATE_SUBSCRIPTIONS' };
};

export const requestFeeds = () => {
  return { type: 'REQUEST_FEEDS' };
};

export const requestSubscriptions = () => {
  return { type: 'REQUEST_SUBSCRIPTIONS' };
};

export const receiveFeeds = (json: Array<Feed>) => {
  return {
    type: 'RECEIVE_FEEDS',
    feeds: json,
    receivedAt: Date.now()
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

const fetchFeeds = () => apiGet('feeds', requestFeeds, receiveFeeds);
const fetchSubscriptions = () => apiGet('subscriptions', requestSubscriptions, receiveSubscriptions);

export const maybeFetchFeeds = () => fetchItemsIfNeeded(shouldFetchFeeds, fetchFeeds);
export const maybeFetchSubscriptions = () => fetchItemsIfNeeded(shouldFetchSubscriptions, fetchSubscriptions);


