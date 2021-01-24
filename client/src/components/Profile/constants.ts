import { TextDecoration, ShadowOptions } from '@/types/types';

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
  TEXT_Y: 180,
};

export const BUTTON_HEIGHT = 126;
export const HEIGHT_OFFSET = 60;
export const USER_PROFILE_INFO = {
  nickName:'Ник:', level:'Уровень:', exp:'Опыт:', cards:'Мои карты:',
};
export const API_INFO_URLS={
  userProfile: `${BASE_HTTP_URL}/users/profile`,
  cards: `${BASE_HTTP_URL}/cards`,
  userDeck:  `${BASE_HTTP_URL}/decks`,
};