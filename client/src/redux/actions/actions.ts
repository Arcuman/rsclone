import { AuthUser } from '@/types/types';
import { AnyAction } from 'redux';
import {
  SET_AUTH_USER,
  USER_REGISTERED,
  REMOVE_AUTH_USER,
  CREATE_GAME,
  END_GAME,
} from './action.types';

export function setAuthInformation(obj: AuthUser): AnyAction {
  return {
    type: SET_AUTH_USER,
    payload: obj,
  };
}

export function removeAuthInformation(login: string): AnyAction {
  return {
    type: REMOVE_AUTH_USER,
    payload: login,
  };
}

export function userRegistered(): AnyAction {
  return {
    type: USER_REGISTERED,
    payload: '',
  };
}

export function createGame(game: Phaser.Game): AnyAction {
  return {
    type: CREATE_GAME,
    payload: game,
  };
}
export function endGame(): AnyAction {
  return {
    type: END_GAME,
  };
}
