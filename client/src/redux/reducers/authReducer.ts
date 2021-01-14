import { State } from '@/types/types';
import { SET_AUTH_USER, USER_REGISTERED, AuthUser } from '../actions/action.types';

const initialState = {
  token: '',
  user_id: 0,
  login: '',
  name: '',
  userRegistered: false,
};

export function authReducer(
  state = initialState,
  action: { type: string; payload: AuthUser },
): State {
  switch (action.type) {
    case SET_AUTH_USER:
      return {
        ...state,
        token: action.payload.token!,
        ...action.payload.user,
        userRegistered: false,
      };
    case USER_REGISTERED:
      return { ...state, userRegistered: true };
    default:
      return state;
  }
}
