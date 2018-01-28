import type { UserProfile } from 'client/types/UserProfile';

export type AuthState = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  idToken: ?string,
  userProfile?: ?UserProfile,
  type?: string
};