import { TextDecoration, ShadowOptions } from '@/types/types';
import { PositionInfo, AvatarPosition } from './Avatar.model';

export const PLAYER_HEALTH_FIELD = 'PLAYER_HEALTH_FIELD';

export const ENEMY_PLAYER = 'ENEMY_PLAYER';

export const positionInfo: PositionInfo = {
  IMG_X: 0,
  IMG_Y: 0,
  USER_NAME_X: 5,
  USER_NAME_Y: 85,
  HEALTH_X: 77,
  HEALTH_Y: 53,
};

export const textDecoration: TextDecoration = {
  FONT_SIZE: '32px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#ffffff',
  TEXT_OUTLINE_COLOR: '#000000',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const textManaDecoration: TextDecoration = {
  FONT_SIZE: '34px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#000000',
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
  IS_SET_ORIGIN: true,
};

export const shadowOptions: ShadowOptions = {
  OFFSET_X: 4,
  OFFSET_Y: 4,
  TINT: 0x000000,
  ALPHA: 0.6,
};

export const avatarPosition: AvatarPosition = {
  USER_X: 1030,
  USER_Y: 630,
  ENEMY_X: 245,
  ENEMY_Y: 100,
};

export const SIZE_AVATAR = 0.7;
