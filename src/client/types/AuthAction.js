import type { UserProfile } from 'client/types/UserProfile';

type SetAuthenticatedAction = {
  type: 'AUTH_SET_AUTHENTICATED',
  isAuthenticated: boolean
}

type SetInitializedAction = {
  type: 'AUTH_SET_INITIALIZED'
}

type SetUserAction = {
  type: 'AUTH_SET_USER',
  user: ?UserProfile
};

type ClearAction = {
  type: 'AUTH_CLEAR'
}

export type AuthAction =
  | SetAuthenticatedAction
  | SetInitializedAction
  | SetUserAction
  | ClearAction;