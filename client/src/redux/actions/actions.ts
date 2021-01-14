import { SET_AUTH_USER, USER_REGISTERED, AuthUser } from './action.types';

interface ActionObj {
  type: string;
  payload: any;
}

export function setAuthInformation(obj: AuthUser): ActionObj {
  return {
    type: SET_AUTH_USER,
    payload: obj,
  };
}

export function userRegistered(): ActionObj {
  return {
    type: USER_REGISTERED,
    payload: '',
  };
}
