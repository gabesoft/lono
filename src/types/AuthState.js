import type { UserProfile } from 'types/UserProfile';

export type AuthState = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  idToken: ?string,
  userProfile?: ?UserProfile,
  type?: string
};
