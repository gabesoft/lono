import type { Feed, Subscription } from 'types/Feed';

type ReceiveFeeds = {
  type: 'RECEIVE_FEEDS',
  feeds: Array<Feed>,
  receivedAt: Date
};

type ReceiveSubscriptions = {
  type: 'RECEIVE_SUBSCRIPTIONS',
  subscriptions: Array<Subscription>,
  receivedAt: Date
};

type RequestFeeds = {
  type: 'REQUEST_FEEDS'
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
  | RequestFeeds
  | InvalidateFeeds;

export type SubscriptionsAction =
  | ReceiveSubscriptions
  | RequestSubscriptions
  | InvalidateSubscriptions;
