const NEXT_TURN = 'nextTurn';
const NEXT_ROUND = 'nextRound';
const HAND_CARD_PLAY = 'handCardPlay';
const TABLE_CARD_PLAY_PLAYER_TARGET = 'tableCardPlayTargerPlayer';
const TABLE_CARD_PLAY_CARD_TARGET = 'tableCardPlayCardTarget';
const PLAYER_DAMAGE = 'playerDamage';
const TABLE_CARD_DAMAGE = 'tableCardDamage';
const TABLE_CARD_DESTROY = 'tableCardDestroy';
const CLOSE_SOCKET = 'closeSocket';
const DISCONNECT = 'disconnect';
const NOT_ENOUGH_MANA = 'notEnoughMana';
const START_GAME = 'startGame';

// TIMER
const TIMER = 'timer';
const BOOM_SPRITESHEET = '../../assets/images/Timer/explosion.png';
const WICK_SPRITESHEET = '../../assets/images/Timer/wick.png';
const BOMB_IMAGE = '../../assets/images/Timer/bomb-explosion.png';
const FRAME_SIZE = {
  BOOM_FRAME: {
    WIDTH: 192,
    HEIGHT: 192,
    END_FRAME: 23,
  },
  WICK_FRAME: {
    WIDTH: 900,
    HEIGHT: 100,
    END_FRAME: 90,
  },
};
const TIMER_LABEL = {
  POSITION: {
    POS_X: 120,
    POS_Y: 350,
  },
  DEFAULT_EMPTY_STRING: '',
  STYLE: {
    FONT_SIZE: '48px',
    FONT_FAMILY: 'Potta One',
    COLOR: 'red',
  },
};
const SPRITE_ANIMATION_CONFIG = {
  CONFIG_EXPLOSION: {
    KEY: 'explosion',
    FRAMES: 'boom',
    FRAME_RATE: 42,
    REPEAT: 0,
  },
  CONFIG_WICK: {
    KEY: 'wick-before-explosion',
    FRAMES: 'wick',
    FRAME_RATE: 17,
    REPEAT: 0,
  },
};
const SPRITE_POSITION = {
  EXPLOSION_SPRITE: {
    POS_X: 120,
    POS_Y: 350,
  },
  WICK_SPRITE: {
    POS_X: 635,
    POS_Y: 350,
  },
};

export {
  START_GAME,
  NEXT_TURN,
  TIMER,
  NEXT_ROUND,
  HAND_CARD_PLAY,
  TABLE_CARD_PLAY_PLAYER_TARGET,
  TABLE_CARD_PLAY_CARD_TARGET,
  PLAYER_DAMAGE,
  TABLE_CARD_DAMAGE,
  TABLE_CARD_DESTROY,
  CLOSE_SOCKET,
  NOT_ENOUGH_MANA,
  DISCONNECT,
  BOOM_SPRITESHEET,
  WICK_SPRITESHEET,
  BOMB_IMAGE,
  FRAME_SIZE,
  TIMER_LABEL,
  SPRITE_ANIMATION_CONFIG,
  SPRITE_POSITION,
};
