import type { UserPost } from 'client/types/Post';

export type PostsState = {
  isFetching: boolean,
  didInvalidate: boolean,
  lastUpdated?: Date,
  items: Array<UserPost>
};