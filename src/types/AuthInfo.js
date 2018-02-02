import type { UserProfile } from 'types/UserProfile';

export type AuthInfo = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  userProfile: ?UserProfile,
  idToken: ?string,
  error: ?Error
};
