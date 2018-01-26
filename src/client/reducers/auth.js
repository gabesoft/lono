import type { AuthAction } from 'client/types/AuthAction';
import type { AuthState} from 'client/types/AuthState';

const defaultState = {
  isAuthenticated: false, isInitialized: false
};

const auth = (state: AuthState = defaultState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_SET_AUTHENTICATED':
      return Object.assign({}, state, { isAuthenticated: action.isAuthenticated });
    case 'AUTH_SET_INITIALIZED':
      return Object.assign({}, state, { isInitialized: true });
    case 'AUTH_SET_USER':
      return Object.assign({}, state, { user: action.user });
    case 'AUTH_CLEAR':
      return Object.assign({}, state, { user: undefined, isAuthenticated: false })
    default:
      return state;
  }
};

export default auth;