import { TextDecoration } from '@/types/types';
import { PositionDeckContainer } from './Deck.model';

export const positionDeckContainer: PositionDeckContainer = {
  IMG_X: 240,
  IMG_Y: 480,
};

export const positionPlayerDeck : PositionDeckContainer = {
  IMG_X: 1200,
  IMG_Y:600,
};
export const positionEnemyDeck : PositionDeckContainer = {
  IMG_X: 80,
  IMG_Y:120,
};

export const textDecoration: TextDecoration = {
  FONT_SIZE: '30px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#d1c49a',
  TEXT_OUTLINE_COLOR: '#292321',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const deckNameDecoration: TextDecoration = {
  FONT_SIZE: '20px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#eddeb0',
  TEXT_OUTLINE_COLOR: '#120805',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const RATIO_OFFSET_X = 1.5;
export const RATIO_OFFSET_Y = 0.9;
export const SCALE_CARD_IN_DECK = 0.7;
export const STANDART_NUMBER_CARD = 10;
export const CHANGE_POSITION_DECK_Y = 50;
export const TINT_VALUE = 0x9a8b6a;

export const CARDS_COUNT_TEXT = 'Карт \nв колоде:';
