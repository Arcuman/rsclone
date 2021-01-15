import { MenuItem } from './MenuItem/MenuItem.model';

const IMAGE_PATH = '../../assets/images/menu';

const MENU_PAGE_BGR_IMAGE = `${IMAGE_PATH}/menu-bgr.jpg`;
const MENU_PAGE_BGR_SETTINGS = 'no-repeat center center fixed';
export const MENU_PAGE_BGR_URL = `url(${MENU_PAGE_BGR_IMAGE}) ${MENU_PAGE_BGR_SETTINGS}`;

const MENU_START_GAME = `${IMAGE_PATH}/start-game-button-ru.png`;
const MENU_MY_CARDS = `${IMAGE_PATH}/my-cards-button-ru.png`;
const MENU_SETTINGS = `${IMAGE_PATH}/settings-button-ru.png`;
const MENU_EXIT = `${IMAGE_PATH}/exit-button-ru.png`;

const MENU_START_GAME_HOVER = `${IMAGE_PATH}/start-game-button-hover-ru.png`;
const MENU_MY_CARDS_HOVER = `${IMAGE_PATH}/my-cards-button-hover-ru.png`;
const MENU_SETTINGS_HOVER = `${IMAGE_PATH}/settings-button-hover-ru.png`;
const MENU_EXIT_HOVER = `${IMAGE_PATH}/exit-button-hover-ru.png`;

const MENU_START_GAME_CLICK = `${IMAGE_PATH}/start-game-button-click-ru.png`;
const MENU_MY_CARDS_CLICK = `${IMAGE_PATH}/my-cards-button-click-ru.png`;
const MENU_SETTINGS_CLICK = `${IMAGE_PATH}/settings-button-click-ru.png`;
const MENU_EXIT_CLICK = `${IMAGE_PATH}/exit-button-click-ru.png`;

export const menuItemInfo: MenuItem[] = [
  {
    urlImg: MENU_START_GAME,
    urlImgHover: MENU_START_GAME_HOVER,
    urlImgClick: MENU_START_GAME_CLICK,
    name: 'start-game',
  },
  {
    urlImg: MENU_MY_CARDS,
    urlImgHover: MENU_MY_CARDS_HOVER,
    urlImgClick: MENU_MY_CARDS_CLICK,
    name: 'my-cards',
  },
  {
    urlImg: MENU_SETTINGS,
    urlImgHover: MENU_SETTINGS_HOVER,
    urlImgClick: MENU_SETTINGS_CLICK,
    name: 'settings',
  },
  { urlImg: MENU_EXIT, urlImgHover: MENU_EXIT_HOVER, urlImgClick: MENU_EXIT_CLICK, name: 'exit' },
];
