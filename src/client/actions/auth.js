import authService from 'client/services/auth';
import type { AuthInfo } from 'client/types/AuthInfo';

export const clearAuth = () => {
  return { type: 'CLEAR_AUTH' };
};

export const setAuthInfo = (info: AuthInfo) => {
  return { type: 'SET_AUTH_INFO', info };
};

export const initializeAuth = () => {
  return async (dispatch: Function) => {
    const info = await authService.init();
    dispatch(setAuthInfo(info));
  };
};

export const signIn = () => {
  return async (dispatch: Function) => {
    const info = await authService.signIn();
    dispatch(setAuthInfo(info))
  };
};

export const signOut = () => {
  return async (dispatch: Function) => {
    const info = await authService.signOut();
    dispatch(setAuthInfo(info))
  };
};

export const refreshAuth = () => {
  return async (dispatch: Function) => {
    const info = await authService.refresh();
    dispatch(setAuthInfo(info))
  };
};