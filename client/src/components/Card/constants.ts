import { PositionInfo, TextDecoration } from './Card.model';

export const positionInfo: PositionInfo = {
  IMG_X: 0,
  IMG_Y: 0,
  MANA_X: -60,
  MANA_Y: -98,
  ATTACK_X: -60,
  ATTACK_Y: 60,
  HEALTH_X: 48,
  HEALTH_Y: 60,
};

export const textDecoration: TextDecoration = {
  FONT_SIZE: '32px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#ffffff',
  TEXT_OUTLINE_COLOR: '#000000',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const CHANGE_POSITION_CARD_Y = 100;
export const SIZE_NORMAL_CARD = 1;
export const SIZE_LITTLE_CARD = 0.6;
