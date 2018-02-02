import type { AuthAction } from 'types/AuthAction';
import type { AuthState} from 'types/AuthState';

const defaultState = (isInitialized: boolean) => {
  return {
    isAuthenticated: false,
    idToken: null,
    isInitialized
  };
};

const auth = (state: AuthState = defaultState(false), action: AuthAction): AuthState => {
  switch (action.type) {
    case 'CLEAR_AUTH':
      return defaultState(state.isInitialized);
    case 'SET_AUTH_INFO':
      return Object.assign({}, state, action.info);
    default:
      return state;
  }
};

export default auth;
