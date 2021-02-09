import { TextDecoration, PositionText } from '@/types/types';
import { PositionDeckContainer } from '@/components/Deck/Deck.model';
import { NewDeckInput } from './Decks.model';

export const positionNewDeck: PositionDeckContainer = {
  IMG_X: 105,
  IMG_Y: 30,
};

export const positionDeckName: PositionText = {
  TEXT_X: -30,
  TEXT_Y: 90,
};

export const positionNewDeckName: PositionText = {
  TEXT_X: -30,
  TEXT_Y: 140,
};

export const positionNewDeckInput: PositionText = {
  TEXT_X: 1200,
  TEXT_Y: 400,
};

export const newDeckText: TextDecoration = {
  FONT_SIZE: '25px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#d1c49a',
  TEXT_OUTLINE_COLOR: '#292321',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};

export const NAME_DECK_TEXT = 'Введите название колоды:';
export const NAME_INPUT_DEFAULT = 'Введите имя';
export const NAME_INPUT_ORIGIN = 1;
export const NAME_INPUT_DEPTH = 300;

export const newDeckInput: NewDeckInput = {
  fontFamily: 'number_font',
  fontSize: '25px',
  color: '#292321',
  align: 'center',
  fixedWidth: 300,
  fixedHeight: 40,
};
