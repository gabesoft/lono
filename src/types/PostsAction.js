import type { UserPost } from 'types/Post';

type ReceivePosts = {
  type: 'RECEIVE_POSTS',
  posts: Array<UserPost>,
  receivedAt: Date
};

type ReceiveMorePosts = {
  type: 'RECEIVE_MORE_POSTS',
  posts: Array<UserPost>,
  receivedAt: Date,
  page: number
};

type RequestPosts = {
  type: 'REQUEST_POSTS'
};

type RequestMorePosts = {
  type: 'REQUEST_MORE_POSTS'
};

type InvalidatePosts = {
  type: 'INVALIDATE_POSTS'
};

export type PostsAction =
  | ReceivePosts
  | ReceiveMorePosts
  | RequestPosts
  | RequestMorePosts
  | InvalidatePosts;
