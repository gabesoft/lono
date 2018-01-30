import type { ReduxState } from 'client/types/ReduxState';

import { refreshAuth } from 'client/actions/auth';

const MAX_RETRY = 2

export const fetchItemsIfNeeded = (shouldFetch: ReduxState => boolean, fetchItems: Function) => {
  return (dispatch: Function, getState: () => ReduxState) => {
    if (shouldFetch(getState())) {
      return dispatch(fetchItems());
    }
  };
}

export const shouldFetchItems = (items: Array<any>, isFetching: boolean, didInvalidate: boolean) => {
  return !isFetching && (items.length == 0 || didInvalidate);
}

export const apiGet = (path: string, request: Function, receive: Function, retryCount: number = 0) => {
  return async (dispatch: Function, getState: () => ReduxState,) => {
    const state = getState();
    const auth = state.auth;

    if (!auth.isAuthenticated) {
      return;
    }

    const idToken = auth.idToken;
    const url = `/api/${path}`;
    const headers = new Headers({
      Authorization: `Bearer ${idToken || ''}`
    });
    const options = {
      method: 'GET',
      headers: headers
    };

    dispatch(request());

    const response = await fetch(url, options);

    if (response.ok) {
      const json = await response.json();
      dispatch(receive(json));
    } else if (response.status === 401 && idToken && retryCount < MAX_RETRY) {
      dispatch(refreshAuth());
      dispatch(apiGet(path, request, receive, retryCount + 1));
    } else {
      dispatch(receive(null));
    }

  };
}