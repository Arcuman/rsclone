import { TextDecoration, ShadowOptions } from '@/types/types';
import { PositionInfo } from './Avatar.model';

export const positionInfo: PositionInfo = {
  IMG_X: 0,
  IMG_Y: 0,
  USER_NAME_X: 0,
  USER_NAME_Y: 72,
  HEALTH_X: 60,
  HEALTH_Y: 35,
};

export const textDecoration: TextDecoration = {
  FONT_SIZE: '32px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#ffffff',
  TEXT_OUTLINE_COLOR: '#000000',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const AvatarNameDecoration: TextDecoration = {
  FONT_SIZE: '24px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#ffffff',
  TEXT_OUTLINE_COLOR: '#000000',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const shadowOptions: ShadowOptions = {
  OFFSET_X: 4,
  OFFSET_Y: 4,
  TINT: 0x000000,
  ALPHA: 0.6,
};

export const SIZE_AVATAR = 0.7;
