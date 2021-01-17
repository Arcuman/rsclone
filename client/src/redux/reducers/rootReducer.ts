import { combineReducers } from 'redux';
import { gameReducer } from '@/redux/reducers/gameReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  authUser: authReducer,
  game: gameReducer,
});
