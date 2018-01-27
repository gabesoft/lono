import type { AuthInfo } from 'client/types/AuthInfo';

type SetInitializedAction = {
  type: 'AUTH_SET_INITIALIZED'
}

type SetAuthInfo = {
  type: 'AUTH_SET_INFO',
  info: AuthInfo
}

type ClearAction = {
  type: 'AUTH_CLEAR'
}

export type AuthAction =
  | SetInitializedAction
  | SetAuthInfo
  | ClearAction;