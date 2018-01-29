import type { UserProfile } from 'client/types/UserProfile';

export type AuthInfo = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  userProfile: ?UserProfile,
  idToken: ?string,
  error: ?Error
};