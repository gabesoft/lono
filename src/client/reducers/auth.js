import type { AuthAction } from 'client/types/AuthAction';
import type { AuthState} from 'client/types/AuthState';

const defaultState = (isInitialized: boolean) => {
  return {
    isAuthenticated: false,
    isInitialized
  };
};

const auth = (state: AuthState = defaultState(false), action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_SET_INITIALIZED':
      return Object.assign({}, state, { isInitialized: true });
    case 'AUTH_CLEAR':
      return defaultState(state.isInitialized);
    case 'AUTH_SET_INFO':
      return Object.assign({}, state, action.info);
    default:
      return state;
  }
};

export default auth;