import type { UserProfile} from 'client/types/UserProfile';

export const authSetInitialized = () => ({ type: 'AUTH_SET_INITIALIZED' });
export const authClear = () => ({ type: 'AUTH_CLEAR' });

export const authSetAuthenticated = (isAuthenticated: boolean) => {
  return { type: 'AUTH_SET_AUTHENTICATED', isAuthenticated }
};

export const authSetUser = (user: ?UserProfile) => {
  return { type: 'AUTH_SET_USER', user };
};
