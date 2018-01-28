import type { AuthAction } from 'client/types/AuthAction';
import type { AuthState} from 'client/types/AuthState';

const defaultState = (isInitialized: boolean) => {
  return {
    isAuthenticated: false,
    idToken: null,
    isInitialized
  };
};

const auth = (state: AuthState = defaultState(false), action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_AUTH_INITIALIZED':
      return Object.assign({}, state, { isInitialized: true });
    case 'CLEAR_AUTH':
      return defaultState(state.isInitialized);
    case 'SET_AUTH_INFO':
      return Object.assign({}, state, action.info);
    default:
      return state;
  }
};

export default auth;
