import type { FeedsAction, SubscriptionsAction } from 'client/types/FeedsAction';
import type { FeedsState, SubscriptionsState } from 'client/types/FeedsState';

const initialFeedsState: FeedsState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

const initialSubscriptionsState: SubscriptionsState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

export const feeds = (state: FeedsState = initialFeedsState, action: FeedsAction) => {
  switch (action.type) {
    case 'RECEIVE_FEEDS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.feeds,
        lastUpdate: action.receivedAt
      });
    case 'REQUEST_FEEDS':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'INVALIDATE_FEEDS':
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state
  }
};

export const subscriptions = (state: SubscriptionsState = initialSubscriptionsState, action: SubscriptionsAction) => {
  switch (action.type) {
    case 'RECEIVE_SUBSCRIPTIONS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.subscriptions,
        lastUpdate: action.receivedAt
      });
    case 'REQUEST_SUBSCRIPTIONS':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case 'INVALIDATE_SUBSCRIPTIONS':
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state
  }
};