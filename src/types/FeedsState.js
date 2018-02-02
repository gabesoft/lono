import type { Feed, Subscription } from 'types/Feed';
import type { ItemsState } from 'types/ItemsState';

export type FeedsState = ItemsState<Feed>;
export type SubscriptionsState = ItemsState<Subscription>;
