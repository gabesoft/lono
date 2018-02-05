import type { Feed, Subscription } from 'types/Feed';
import type { ItemsState, Paginated } from 'types/ItemsState';

export type FeedsState = ItemsState<Feed> & Paginated;
export type SubscriptionsState = ItemsState<Subscription>;
