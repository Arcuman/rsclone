import { PositionText } from '@/types/types';
import { PositionDeckContainer } from '@/components/Deck/Deck.model';
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

export const positionDeckContainer: PositionDeckContainer = {
  IMG_X: 10,
  IMG_Y: 10,
};

export const positionDeckName: PositionText = {
  TEXT_X: -30,
  TEXT_Y: 70,
};

export const CARDS_POS_UP_Y = 0;
export const CARDS_POS_DOWN_Y = 155;
export const DECKS_OFFSET_Y = 140;
export const CARDS_SCALE = 0.7;
export const NUMBER_CARDS_IN_ROW = 3;
export const NUMBER_CARDS_IN_DECK = 5;
export const NAME_CARDS = 'cards';
export const NAME_DECKS = 'decks';
export const ZERO_POSITION_Y = 0;
export const TINT_VALUE_CLICK = 0x59503d;
