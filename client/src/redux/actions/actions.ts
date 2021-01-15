import {AuthUser} from '@/types/types';
import { SET_AUTH_USER, USER_REGISTERED, REMOVE_AUTH_USER } from './action.types';

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

export function removeAuthInformation(login:string): ActionObj {
  return {
    type: REMOVE_AUTH_USER,
    payload: login,
  };
}

export function userRegistered(): ActionObj {
  return {
    type: USER_REGISTERED,
    payload: '',
  };
}
