import { CardsContainerPosition } from '@/components/MyCardsScene/MyCards.model';
import { PositionText, TextDecoration } from '@/types/types';
import { PositionDeckContainer } from '@/components/Deck/Deck.model';

export const NAME_DECKS = 'decks';
export const FIRST_PAGE = 1;

export const decksContainerPosition: CardsContainerPosition = {
  CONTAINER_X: 230,
  CONTAINER_Y: 270,
};
export const HEIGHT_OFFSET = 50;

export const positionMenu = {
  OFFSET_X: 180,
  Y: 20,
};
export const BUTTON_SCALE = 0.4;
export const positionDeckContainer: PositionDeckContainer = {
  IMG_X: 10,
  IMG_Y: 10,
};
export const positionDeckName: PositionText = {
  TEXT_X: -30,
  TEXT_Y: 70,
};
export const NUMBER_CARDS_IN_DECK = 5;
export const TINT_VALUE_CLICK = 0x59503d;
export const TINT_VALUE = 0x91d7e9;
export const INFO_BLOCK_SCALE = 0.8;
export const INFO_BLOCK_X = 330;
export const CHOOSE_CURR_DECK = 'Выберете колоду\nдля игры:';
export const textDecoration: TextDecoration = {
  FONT_SIZE: '32px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#d1c49a',
  TEXT_OUTLINE_COLOR: '#292321',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const positionInfo: PositionText = {
  TEXT_X: 210,
  TEXT_Y: 120,
};
