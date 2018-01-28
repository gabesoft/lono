import type { AuthInfo } from 'client/types/AuthInfo';

export const authSetInitialized = () => {
  return { type: 'SET_AUTH_INITIALIZED' };
};
export const authClear = () => {
  return { type: 'CLEAR_AUTH' };
};
export const authSetInfo = (info: AuthInfo) => {
  return { type: 'SET_AUTH_INFO', info };
};
