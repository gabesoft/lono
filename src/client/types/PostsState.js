import type { UserPost } from 'client/types/Post';
import type { ItemsState, Paginated } from 'client/types/ItemsState';

export type PostsState = ItemsState<UserPost> & Paginated;