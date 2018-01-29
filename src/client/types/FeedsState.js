import type { Feed, Subscription } from 'client/types/Feed';
import type { ItemsState } from 'client/types/ItemsState';

export type FeedsState = ItemsState<Feed>;
export type SubscriptionsState = ItemsState<Subscription>;
