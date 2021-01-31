import { CardsContainerPosition } from '@/components/MyCardsScene/MyCards.model';
import { PositionText, TextDecoration } from '@/types/types';
import { PositionDeckContainer } from '@/components/Deck/Deck.model';
import { ArrowButton } from '@/components/MyCardsScene/Button/Button.model';

export const NAME_DECKS = 'decks';
export const FIRST_PAGE = 1;

export const decksContainerPosition: CardsContainerPosition = {
  CONTAINER_X: 230,
  CONTAINER_Y: 270,
};
export const HEIGHT_OFFSET = 50;
export const BUTTON_SCALE = 0.4;

export const positionMenu = {
  OFFSET_X: 180,
  Y: 20,
};
export const positionDeckContainer: PositionDeckContainer = {
  IMG_X: 10,
  IMG_Y: 0,
};
export const offsetDeck ={
  X:150,
  Y:180,
};
export const positionDeckName: PositionText = {
  TEXT_X: -30,
  TEXT_Y: 70,
};
export const positionInfo: PositionText = {
  TEXT_X: 210,
  TEXT_Y: 120,
};

export const NUMBER_CARDS_IN_DECK = 5;
export const NUMBER_DECKS_ON_PAGE = 4;
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
export const arrowButtonCurrDeck: ArrowButton[] = [
  {
    NAME: 'decks_left',
    IMG:'arrow_left',
    POS_X: 200,
    POS_Y: 565,
  },
  {
    NAME: 'decks_right',
    IMG:'arrow_right',
    POS_X: 450,
    POS_Y: 565,
  },
];

export const DECKS_LEFT = 'decks_left';
export const DECKS_RIGHT = 'decks_right';
export const MIN_POSSIBLE_PAGES = 1;
export const ONE_PAGE = 1;
export const ARROW_BUTTON_RISE_SCALE = 0.38;
