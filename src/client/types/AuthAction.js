import type { AuthInfo } from 'client/types/AuthInfo';

type SetAuthInitialized = {
  type: 'SET_AUTH_INITIALIZED'
}

type SetAuthInfo = {
  type: 'SET_AUTH_INFO',
  info: AuthInfo
}

type ClearAuth = {
  type: 'CLEAR_AUTH'
}

export type AuthAction =
  | SetAuthInitialized
  | SetAuthInfo
  | ClearAuth;
