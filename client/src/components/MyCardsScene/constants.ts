import {  PositionText } from '@/types/types';
import { NewDeckInput } from '@/components/MyCardsScene/Decks/Decks.model';
import { CardsPosition, CardsContainerPosition } from './MyCards.model';

export const cardsContainerPosition: CardsContainerPosition = {
  CONTAINER_X: 135,
  CONTAINER_Y: 180,
};

export const decksContainerPosition: CardsContainerPosition = {
  CONTAINER_X: 935,
  CONTAINER_Y: 162,
};

export const cardsPosition: CardsPosition = {
  OFFSET_X: 110,
  EXTRA_OFFSET_X: 40,
  REDUCE_ID_1: 3,
  REDUCE_ID_2: 3,
  REDUCE_ID_3: 6,
};

export const decksPosition: CardsPosition = {
  OFFSET_X: 110,
  EXTRA_OFFSET_X: 0,
  REDUCE_ID_1: 3,
  REDUCE_ID_2: 6,
  REDUCE_ID_3: 9,
};

export const positionWarningMessage: PositionText = {
  TEXT_X: 480,
  TEXT_Y: 510,
};

export const warningMessageText: NewDeckInput = {
  fontFamily: 'number_font',
  fontSize: '20px',
  color: '#d1c49a',
  align: 'center',
  fixedWidth: 300,
  fixedHeight: 200,
};

export const WARNING_OUTLINE_COLOR ='#292321';
export const WARNING_OUTLINE_SIZE = 5;
export const WARNING_OUTLINE_DEPTH = 2;

export const NAME_POS_Y = 60;
export const NAME_OFFSET_X = 5;

export const CARDS_POS_UP_Y = 0;
export const CARDS_POS_DOWN_Y = 150;
export const DECKS_OFFSET_Y = 140;
export const CARDS_SCALE = 0.7;
export const NUMBER_CARDS_IN_ROW = 3;
export const NUMBER_CARDS_IN_DECK = 5;
export const NAME_CARDS = 'cards';
export const NAME_DECKS = 'decks';
export const ZERO_POSITION_Y = 0;
export const TINT_VALUE_CLICK = 0x59503d;
export const NUMBER_CARDS_ON_PAGE = 12;
export const FIRST_PAGE = 1;
export const ORIGIN_HALF = 0.5;

export const CREATE_NEW_DECK = 'create_new_deck';
export const CARDS_VIEW_DECK = 'cards_view_deck';
export const DECKS_VIEW_DECK = 'decks_view_deck';
export const CARDS_EDIT_DECK = 'cards_edit_deck';
export const DECKS_EDIT_DECK = 'decks_edit_deck';

export const WARNING_MAX_CARDS = 'У Вас максимальное количество\n карт в колоде';
export const WARNING_ADD_CARDS = 'Добавьте карты в колоду \n и сохраните';
export const WARNING_EMPTY = '';
