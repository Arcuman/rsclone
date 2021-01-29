import { ArrowButton } from './Button.model';

export const arrowButton: ArrowButton[] = [
  {
    NAME: 'cards_left',
    IMG:'arrow_left',
    POS_X: 250,
    POS_Y: 420,
  },
  {
    NAME: 'cards_right',
    IMG:'arrow_right',
    POS_X: 630,
    POS_Y: 420,
  },
  {
    NAME: 'decks_left',
    IMG:'arrow_left',
    POS_X: 950,
    POS_Y: 680,
  },
  {
    NAME: 'decks_right',
    IMG:'arrow_right',
    POS_X: 1150,
    POS_Y: 680,
  },
];

export const TINT_VALUE_CLICK = 0x59503d;
export const ARROW_BUTTON_NORMAL_SCALE = 0.35;
export const ARROW_BUTTON_RISE_SCALE = 0.38;
export const CARDS_LEFT = 'cards_left';
export const CARDS_RIGHT = 'cards_right';
export const DECKS_LEFT = 'decks_left';
export const DECKS_RIGHT = 'decks_right';
export const MIN_POSSIBLE_PAGES = 1;