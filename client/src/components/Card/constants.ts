import { TextDecoration, ShadowOptions } from '@/types/types';
import { PositionInfo } from './Card.model';

export const positionInfo: PositionInfo = {
  IMG_X: 0,
  IMG_Y: 0,
  MANA_X: -50,
  MANA_Y: -81,
  ATTACK_X: -49,
  ATTACK_Y: 78,
  HEALTH_X: 56,
  HEALTH_Y: 78,
};

export const textDecoration: TextDecoration = {
  FONT_SIZE: '29px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#ffffff',
  TEXT_OUTLINE_COLOR: '#000000',
  TEXT_OUTLINE_SIZE: 4,
  TEXT_DEPTH: 2,
  IS_SET_ORIGIN: true,
};

export const shadowOptions: ShadowOptions = {
  OFFSET_X: 4,
  OFFSET_Y: 4,
  TINT: 0x000000,
  ALPHA: 0.6,
};

export const SIZE_NORMAL_CARD = 1.1;
export const DEPTH_NORMAL_CARD = 1;
export const DEPTH_CLICK_CARD = 10;
export const SIZE_LITTLE_CARD = 0.8;
export const SIZE_TINY_CARD = 0.7;
export const SIZE_LARGE_CARD = 0.9;
export const CARD_CONTAINER_DEPTH = 1;
export const CARD_ORIGIN_CENTER = 0.5;
export const IMAGE_CARD_SIZE = 147;

export const MAX_TABLE_SIZE = 7;

export const CARD_HEALTH_FIELD = 'CARD_HEALTH_FIELD';
export const CARD_ID_FIELD = 'CARD_ID_FIELD';
export const CARD_MANA_FIELD = 'CARD_MANA_FIELD';
export const CARD_IS_ACTIVE_FIELD = 'CARD_IS_ACTIVE_FIELD';
export const CARD_IS_PLAYED_FIELD = 'CARD_IS_PLAYED_FIELD';
export const CARD_IS_PLAYED_FIELD_INIT = true;
