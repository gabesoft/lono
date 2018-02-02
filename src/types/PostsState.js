import type { ItemsState, Paginated } from 'types/ItemsState';
import type { UserPost } from 'types/Post';

export type PostsState = ItemsState<UserPost> & Paginated;