import { TextDecoration } from '@/types/types';

import { BASE_HTTP_URL } from '@/constants/constants';

export const textDecoration: TextDecoration = {
  FONT_SIZE: '32px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#ffffff',
  TEXT_OUTLINE_COLOR: '#000000',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const positionInfo = {
  TEXT_X: 150,
  TEXT_Y: 160,
};
export const positionMenu = {
  OFFSET_X: 180,
  Y: 20,
};

export const BUTTON_HEIGHT = 126;
export const HEIGHT_OFFSET = 50;

export const INFO_BLOCK_SCALE = 0.8;
export const INFO_BLOCK_X = 270;
export const USER_PROFILE_INFO = {
  nickName: 'Ник:',
  level: 'Уровень:',
  exp: 'Опыт:',
  cards: 'Мои карты:',
  currDeck: 'Текущая колода:',
  counts: 'шт.',
};
export const API_INFO_URLS = {
  userProfile: `${<string>BASE_HTTP_URL}/users/profile`,
  cards: `${<string>BASE_HTTP_URL}/cards`,
  userDeck: `${<string>BASE_HTTP_URL}/decks`,
};
