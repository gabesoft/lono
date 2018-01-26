export type Post = {
  createdAt?: string,
  updatedAt?: string,

  __v?: number,
  author?: ?string,
  date?: string,
  description: string,
  guid: string,
  link: string,
  summary?: string,
  title: string
};

export type UserPost = {
  createdAt: string,
  updatedAt: string,

  _id: string,
  feedId: string,
  post: Post,
  postId: string,
  read: boolean,
  subscriptionId: string,
  tags: Array<string>,
  title: string,
  userId: string
};