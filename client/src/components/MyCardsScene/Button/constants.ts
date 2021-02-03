import { TextDecoration } from '@/types/types';
import { ArrowButton, ControlButton, ButtonSettings } from './Button.model';

export const CARDS_LEFT = 'cards_left';
export const CARDS_RIGHT = 'cards_right';
export const DECKS_LEFT = 'decks_left';
export const DECKS_RIGHT = 'decks_right';
export const MIN_POSSIBLE_PAGES = 1;
export const ONE_PAGE = 1;

export const CREATE_BUTTON = 'create_button';
export const EDIT_BUTTON = 'edit_button';
export const DONE_BUTTON = 'done_button';
export const DELETE_BUTTON = 'delete_button';

export const MENU_BUTTON_OFFSET_X = 650;
export const MENU_BUTTON_Y = 140;
export const MENU_BUTTON_OFFSET = 500;
export const MENU_BUTTON_SCALE = 0.4;

export const arrowButtonSettings: ButtonSettings = {
  NORMAL_SCALE: 0.35,
  RISE_SCALE: 0.38,
  TINT_CLICK: 0x59503d,
};

export const deleteButtonSettings: ButtonSettings = {
  NORMAL_SCALE: 0.2,
  RISE_SCALE: 0.25,
  TINT_CLICK: 0x59503d,
};

export const controlButtonSettings: ButtonSettings = {
  NORMAL_SCALE: 0.3,
  RISE_SCALE: 0.35,
  TINT_CLICK: 0x59503d,
};

export const deleteButtonPosition: ArrowButton = {
  NAME: DELETE_BUTTON,
  IMG: DELETE_BUTTON,
  POS_X: 65,
  POS_Y: -85,
};

export const deleteButtonForDecks: ArrowButton = {
  NAME: DELETE_BUTTON,
  IMG: DELETE_BUTTON,
  POS_X: 50,
  POS_Y: -60,
};

export const arrowButton: ArrowButton[] = [
  {
    NAME: CARDS_LEFT,
    IMG:'arrow_left',
    POS_X: 250,
    POS_Y: 420,
  },
  {
    NAME: CARDS_RIGHT,
    IMG:'arrow_right',
    POS_X: 630,
    POS_Y: 420,
  },
  {
    NAME: DECKS_LEFT,
    IMG:'arrow_left',
    POS_X: 950,
    POS_Y: 680,
  },
  {
    NAME: DECKS_RIGHT,
    IMG:'arrow_right',
    POS_X: 1150,
    POS_Y: 680,
  },
];

export const decksControlButtonData: ControlButton[] = [
  {
    NAME: CREATE_BUTTON,
    IMG: CREATE_BUTTON,
    PROMPT: 'Создать колоду',
    POS_X: 1000,
    POS_Y: 680,
    PROMPT_X: 1020,
    PROMPT_Y: 685,
  },
  {
    NAME: EDIT_BUTTON,
    IMG: EDIT_BUTTON,
    PROMPT: 'Редактировать',
    POS_X: 1050,
    POS_Y: 680,
    PROMPT_X: 1070,
    PROMPT_Y: 685,
  },
  {
    NAME: DONE_BUTTON,
    IMG: DONE_BUTTON,
    PROMPT: 'Сохранить/выйти',
    POS_X: 1100,
    POS_Y: 680,
    PROMPT_X: 1120,
    PROMPT_Y: 685,
  },  
];

export const promptDecoration: TextDecoration = {
  FONT_SIZE: '20px',
  FONT_FAMILY: 'number_font',
  FONT_COLOR: '#d1c49a',
  TEXT_OUTLINE_COLOR: '#292321',
  TEXT_OUTLINE_SIZE: 5,
  TEXT_DEPTH: 2,
};
