import type { UserProfile} from 'client/services/auth';

export type AuthAction = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  user: UserProfile,
  type: string
};

export const authSetInitialized = () => ({ type: 'AUTH_SET_INITIALIZED' });
export const authClear = () => ({ type: 'AUTH_CLEAR' });

export const authSetAuthenticated = (isAuthenticated: boolean) => {
  return { type: 'AUTH_SET_AUTHENTICATED', isAuthenticated }
};

export const authSetUser = (user: ?UserProfile) => {
  return { type: 'AUTH_SET_USER', user };
};
