import { createHtmlElement } from '@/utils/utils';
import { handleLogout } from '@/components/Auth/Auth.services';
import { createMenuItem } from './MenuItem/MenuItem.render';
import { MENU_PAGE_BGR_URL, menuItemInfo } from './constants';
import './menu.scss';
import { MenuItem } from './MenuItem/MenuItem.model';

export const createMenuPage = (): HTMLElement => {
  const menuBlock: HTMLElement = createHtmlElement('div', 'menu__wrapper');

  menuItemInfo.forEach((elem: MenuItem) => {
    const menuItem: HTMLElement = createMenuItem('button', 'menu__button', elem);
    menuItem.setAttribute('id', elem.name);
    if (elem.name === 'exit') {
      menuItem.addEventListener('click', () => handleLogout());
    }
    menuBlock.appendChild(menuItem);
  });

  document.body.style.background = MENU_PAGE_BGR_URL;
  document.body.style.backgroundSize = 'cover';

  return menuBlock;
};
