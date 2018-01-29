import type { UserPost } from 'client/types/Post';

type ReceivePosts = {
  type: 'RECEIVE_POSTS',
  posts: Array<UserPost>,
  receivedAt: Date
};

type RequestPosts = {
  type: 'REQUEST_POSTS'
};

type InvalidatePosts = {
  type: 'INVALIDATE_POSTS'
};

export type PostsAction =
  | ReceivePosts
  | RequestPosts
  | InvalidatePosts;
