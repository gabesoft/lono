import type { FeedsAction, SubscriptionsAction } from 'types/FeedsAction';
import type { FeedsState, SubscriptionsState } from 'types/FeedsState';

const initialFeedsState: FeedsState = {
  isFetching: false,
  didInvalidate: false,
  hasMore: false,
  page: 1,
  items: []
};

const initialSubscriptionsState: SubscriptionsState = {
  isFetching: false,
  didInvalidate: false,
  items: []
};

export const feeds = (state: FeedsState = initialFeedsState, action: FeedsAction) => {
  switch (action.type) {
    case 'RECEIVE_FEEDS': {
      const feeds = action.feeds || [];
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: feeds,
        hasMore: action.hasMore,
        lastUpdate: action.receivedAt
      });
    }
    case 'RECEIVE_MORE_FEEDS': {
      const feeds = action.feeds || [];
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        hasMore: action.hasMore,
        items: state.items.concat(feeds),
        page: action.page,
        lastUpdate: action.receivedAt
      });
    }
    case 'REQUEST_FEEDS':
    case 'REQUEST_MORE_FEEDS': {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    }
    case 'INVALIDATE_FEEDS': {
      return Object.assign({}, state, {
        didInvalidate: true
      });
    }
    default:
      return state
  }
};

export const subscriptions = (state: SubscriptionsState = initialSubscriptionsState, action: SubscriptionsAction) => {
  switch (action.type) {
    case 'RECEIVE_SUBSCRIPTIONS': {
      const subscriptions = action.subscriptions || [];
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: subscriptions,
        lastUpdate: action.receivedAt
      });
    }
    case 'REQUEST_SUBSCRIPTIONS': {
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    }
    case 'INVALIDATE_SUBSCRIPTIONS': {
      return Object.assign({}, state, {
        didInvalidate: true
      });
    }
    default:
      return state
  }
};
