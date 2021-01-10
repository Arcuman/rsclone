import { MyCustomType } from './types';

const IMAGE_PATH = '../../assets/images';

const MENU_PAGE_BGR_IMAGE = `${IMAGE_PATH}/menu-bgr.jpg`;
const MENU_PAGE_BGR_SETTINGS = 'no-repeat center center fixed';
export const MENU_PAGE_BGR_URL = `url(${MENU_PAGE_BGR_IMAGE}) ${MENU_PAGE_BGR_SETTINGS}`;

export const MENU_START_GAME = `${IMAGE_PATH}/start-game-button-ru.png`;
export const MENU_MY_CARDS = `${IMAGE_PATH}/my-cards-button-ru.png`;
export const MENU_SETTINGS = `${IMAGE_PATH}/settings-button-ru.png`;

export const menuItemInfo: MyCustomType = [
  { urlImg: MENU_START_GAME, name: 'start-game' },
  { urlImg: MENU_MY_CARDS, name: 'my-cards' },
  { urlImg: MENU_SETTINGS, name: 'settings' },
];
