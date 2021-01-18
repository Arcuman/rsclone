import { AuthUser, AuthUserState } from '@/types/types';
import { SET_AUTH_USER, REMOVE_AUTH_USER, USER_REGISTERED } from '../actions/action.types';

const initialState = {
  accessToken: '',
  user_id: 0,
  login: '',
  name: '',
  tokenExpDate: 0,
  userRegistered: false,
  hasRefreshToken: false,
};

export function authReducer(
  state = initialState,
  action: { type: string; payload: AuthUser },
): AuthUserState {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        tokenExpDate: <number>action.payload.tokenExpDate,
        ...action.payload.user,
        hasRefreshToken: true,
        userRegistered: false,
      };
    case REMOVE_AUTH_USER:
      return {
        ...state,
        ...initialState,
      };
    case USER_REGISTERED:
      return { ...state, userRegistered: true };
    default:
      return state;
  }
}
