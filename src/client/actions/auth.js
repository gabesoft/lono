import type { AuthInfo } from 'client/types/AuthInfo';

export const authSetInitialized = () => {
  return { type: 'AUTH_SET_INITIALIZED' };
};
export const authClear = () => {
  return { type: 'AUTH_CLEAR' };
};
export const authSetInfo = (info: AuthInfo) => {
  return { type: 'AUTH_SET_INFO', info };
}