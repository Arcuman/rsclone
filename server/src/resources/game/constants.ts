export const NUMBER_OF_HAND_CARDS = 3;
export const MAX_HEALTH = 12;
export const MAX_HAND_CARDS = 5;
export const START_MANA = 3;
export const COUNTDOWN_SEC = 25;
export const PLAYER_READY = 0;
export const ONE_SEC = 1000;
export const NO_SUCH_CARD_ERROR = 'NO SUCH CARD';
export const EXP_WIN = 15;
export const EXP_LOSE = 5;

const OPPONENT_FOUND = 'opponentFound';
const ALREADY_PLAY = 'already_play';
const INIT_STATE = 'initState';
const START_GAME = 'startGame';
const NEXT_TURN = 'nextTurn';
const GET_DECK_CARD = 'GET_DECK_CARD';
const ENEMY_GET_DECK_CARD = 'ENEMY_GET_DECK_CARD';
const DESTROY_DECK_CARD = 'DESTROY_DECK_CARD';
const TIMER = 'timer';
const WAIT_SECOND_PLAYER = 'waitSecondPlayer';
const NEXT_ROUND = 'nextRound';
const HAND_CARD_PLAY = 'handCardPlay';
const TABLE_CARD_PLAY_PLAYER_TARGET = 'tableCardPlayTargerPlayer';
const TABLE_CARD_PLAY_CARD_TARGET = 'tableCardPlayCardTarget';
const PLAYER_DAMAGE = 'playerDamage';
const TABLE_CARD_DAMAGE = 'tableCardDamage';
const ENEMY_TABLE_CARD_DAMAGE = 'enemyTableCardDamage';
const TABLE_CARD_DESTROY = 'tableCardDestroy';
const CLOSE_SOCKET = 'closeSocket';
const DISCONNECT = 'disconnect';
const NOT_ENOUGH_MANA = 'notEnoughMana';
const PLAYER_WIN = 'PLAYER_WIN';
const PLAYER_LOSE = 'PLAYER_LOSE';

export {
  OPPONENT_FOUND,
  START_GAME,
  NEXT_TURN,
  TIMER,
  WAIT_SECOND_PLAYER,
  NEXT_ROUND,
  HAND_CARD_PLAY,
  TABLE_CARD_PLAY_PLAYER_TARGET,
  TABLE_CARD_PLAY_CARD_TARGET,
  PLAYER_DAMAGE,
  TABLE_CARD_DAMAGE,
  TABLE_CARD_DESTROY,
  CLOSE_SOCKET,
  NOT_ENOUGH_MANA,
  ALREADY_PLAY,
  DISCONNECT,
  INIT_STATE,
  ENEMY_TABLE_CARD_DAMAGE,
  PLAYER_WIN,
  PLAYER_LOSE,
  GET_DECK_CARD,
  ENEMY_GET_DECK_CARD,
  DESTROY_DECK_CARD,
};
