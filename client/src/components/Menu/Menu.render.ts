import { MENU_PAGE_BGR_IMAGE, MENU_START_GAME, MENU_MY_CARDS, MENU_SETTINGS } from './constants';

import createHtmlElement from '../../utils/utils';
import createMenuItem from './MenuItem/MenuItem.render';

const createMenuPage = (): HTMLElement => {
  const menuBlock: HTMLElement = createHtmlElement('div', 'menu__wrapper');

  const menuStartGameBut: HTMLElement = createMenuItem(
    'div',
    'menu__button',
    MENU_START_GAME,
    'start-game'
  );
  menuBlock.appendChild(menuStartGameBut);

  const menuCardsBut: HTMLElement = createMenuItem(
    'div',
    'menu__button',
    MENU_MY_CARDS,
    'my-cards'
  );
  menuBlock.appendChild(menuCardsBut);

  const menuSettingBut: HTMLElement = createMenuItem(
    'div',
    'menu__button',
    MENU_SETTINGS,
    'settings'
  );
  menuBlock.appendChild(menuSettingBut);

  document.body.style.background = `url(${MENU_PAGE_BGR_IMAGE}) no-repeat center center fixed`;
  document.body.style.backgroundSize = 'cover';

  return menuBlock;
};

export default createMenuPage;
