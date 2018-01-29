import type { ReduxState } from 'client/types/ReduxState';

import { refreshAuth } from 'client/actions/auth';

export const apiGet = (path: string, request: Function, receive: Function, invalidate?: Function) => {
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
    } else if (response.status === 401) {
      dispatch(refreshAuth());
      if (invalidate) {
        dispatch(invalidate());
      }
    }

  };
}