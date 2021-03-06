
export type FeedImage = {
  url: string,
  title: string
};

export type Feed = {
  _id: string,
  author?: ?string,
  date?: ?string,
  description?: ?string,
  favicon?: ?string,
  format?: ?string,
  generator?: ?string,
  guid?: ?string,
  image?: ?FeedImage,
  language?: ?string,
  lastPostDate?: ?string,
  lastReadDate?: ?string,
  link?: string,
  postCount: number,
  title: string,
  updatedAt?: string,
  uri: string,

  data?: ?{ etag: ?string, 'last-modified': ?string },
  lastReadStatus?: { readStatusError: ?string, readStatus: ?string }
};

export type Subscription = {
  createdAt: string,
  updatedAt: string,

  _id: string,
  disabled: boolean,
  feedId: string,
  tags: Array<string>,
  title: string,
  unreadCount: number,
  userId: string
};