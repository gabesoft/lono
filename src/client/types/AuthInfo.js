import type { UserProfile } from 'client/types/UserProfile';

export type AuthInfo = {
  isAuthenticated: boolean,
  userProfile: ?UserProfile,
  idToken: ?string
};