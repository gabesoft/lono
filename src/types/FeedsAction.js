import type { Feed, Subscription } from 'types/Feed';

type ReceiveFeeds = {
  type: 'RECEIVE_FEEDS',
  feeds: Array<Feed>,
  receivedAt: Date,
  hasMore: boolean
};

type ReceiveMoreFeeds = {
  type: 'RECEIVE_MORE_FEEDS',
  feeds: Array<Feed>,
  receivedAt: Date,
  hasMore: boolean,
  page: number
};

type ReceiveSubscriptions = {
  type: 'RECEIVE_SUBSCRIPTIONS',
  subscriptions: Array<Subscription>,
  receivedAt: Date
};

type RequestFeeds = {
  type: 'REQUEST_FEEDS'
};

type RequestMoreFeeds = {
  type: 'REQUEST_MORE_FEEDS'
};

type RequestSubscriptions = {
  type: 'REQUEST_SUBSCRIPTIONS'
};

type InvalidateFeeds = {
  type: 'INVALIDATE_FEEDS'
};

type InvalidateSubscriptions = {
  type: 'INVALIDATE_SUBSCRIPTIONS'
};

export type FeedsAction =
  | ReceiveFeeds
  | ReceiveMoreFeeds
  | RequestFeeds
  | RequestMoreFeeds
  | InvalidateFeeds;

export type SubscriptionsAction =
  | ReceiveSubscriptions
  | RequestSubscriptions
  | InvalidateSubscriptions;
