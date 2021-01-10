import { createHtmlElement } from '@/utils/utils';
import { createMenuItem } from './MenuItem/MenuItem.render';
import { MENU_PAGE_BGR_URL, menuItemInfo } from './constants';
import '@/styles/menu.scss';
import { MyCastomInterface } from './types';

export const createMenuPage = (): HTMLElement => {
  const menuBlock: HTMLElement = createHtmlElement('div', 'menu__wrapper');

  menuItemInfo.forEach((elem: MyCastomInterface) => {
    const menuItem: HTMLElement = createMenuItem('div', 'menu__button', elem.urlImg, elem.name);
    menuBlock.appendChild(menuItem);
  });

  document.body.style.background = MENU_PAGE_BGR_URL;
  document.body.style.backgroundSize = 'cover';

  return menuBlock;
};
