
export type ItemsState<T> = {
  isFetching: boolean,
  didInvalidate: boolean,
  lastUpdated?: Date,
  items: Array<T>
};