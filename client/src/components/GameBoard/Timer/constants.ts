import { IMAGES } from '@/components/Game/constant';

const TIMER = 'timer';
const BOOM_SPRITESHEET = '../../../assets/images/Timer/explosion.png';
const WICK_SPRITESHEET = '../../../assets/images/Timer/wick.png';
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
const TIMER_COUNTDOWN = {
  ALMOST_EXPIRED: 5,
  EXPIRED: 0,
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
const SET_ORIGIN = {
  TIMER_LABEL_TEXT: 0.5,
};
const BOMB_IMAGE = {
  POS_X: 140,
  POS_Y: 350,
  TEXTURE: IMAGES.BOMB.NAME,
};
export const TIMER_TOP_DEPTH = 1000;

export {
  TIMER,
  BOOM_SPRITESHEET,
  WICK_SPRITESHEET,
  FRAME_SIZE,
  TIMER_LABEL,
  SPRITE_ANIMATION_CONFIG,
  SPRITE_POSITION,
  TIMER_COUNTDOWN,
  SET_ORIGIN,
  BOMB_IMAGE,
};
