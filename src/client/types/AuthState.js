import type { UserProfile } from 'client/types/UserProfile';

export type AuthState = {
  isAuthenticated: boolean,
  isInitialized: boolean,
  user?: ?UserProfile,
  type?: string
};