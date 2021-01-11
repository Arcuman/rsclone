import { MenuItemType } from './MenuItem/MenuItem.model';

const IMAGE_PATH = '../../assets/images';

const MENU_PAGE_BGR_IMAGE = `${IMAGE_PATH}/menu-bgr.jpg`;
const MENU_PAGE_BGR_SETTINGS = 'no-repeat center center fixed';
export const MENU_PAGE_BGR_URL = `url(${MENU_PAGE_BGR_IMAGE}) ${MENU_PAGE_BGR_SETTINGS}`;

const MENU_START_GAME = `${IMAGE_PATH}/start-game-button-ru.png`;
const MENU_MY_CARDS = `${IMAGE_PATH}/my-cards-button-ru.png`;
const MENU_SETTINGS = `${IMAGE_PATH}/settings-button-ru.png`;

const MENU_START_GAME_HOVER = `${IMAGE_PATH}/start-game-button-hover-ru.png`;
const MENU_MY_CARDS_HOVER = `${IMAGE_PATH}/my-cards-button-hover-ru.png`;
const MENU_SETTINGS_HOVER = `${IMAGE_PATH}/settings-button-hover-ru.png`;

export const menuItemInfo: MenuItemType[] = [
  { urlImg: MENU_START_GAME, urlImgHover: MENU_START_GAME_HOVER, name: 'start-game' },
  { urlImg: MENU_MY_CARDS, urlImgHover: MENU_MY_CARDS_HOVER, name: 'my-cards' },
  { urlImg: MENU_SETTINGS, urlImgHover: MENU_SETTINGS_HOVER, name: 'settings' },
];
