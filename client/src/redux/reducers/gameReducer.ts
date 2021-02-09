import { GameState } from '@/types/types';
import { CREATE_GAME, END_GAME } from '@/redux/actions/action.types';

const initialState = {
  game: null,
};

export function gameReducer(
  state: {
    game: null | Phaser.Game;
  } = initialState,
  action: { type: string; payload: Phaser.Game | null },
): GameState {
  switch (action.type) {
    case CREATE_GAME:
      return { ...state, game: action.payload };
      break;
    case END_GAME:
      if (state.game !== null) {
        state.game.destroy(true);
      }
      return { ...state, game: null };
      break;
    default:
      return { ...state };
      break;
  }
}
