import { createHtmlElement } from '@/utils/utils';
import { MenuItem } from './MenuItem.model';
import './menuItem.scss';

const addEventOnButton = (
  elem: MenuItem,
  menuItem: HTMLElement,
  menuItemImg: HTMLElement,
): void => {
  menuItem.addEventListener('mouseover', () => {
    menuItemImg.setAttribute('src', elem.urlImgHover);
  });

  menuItem.addEventListener('mouseout', () => {
    menuItemImg.setAttribute('src', elem.urlImg);
  });

  menuItem.addEventListener('mousedown', () => {
    menuItemImg.setAttribute('src', elem.urlImgClick);
  });

  menuItem.addEventListener('mouseup', () => {
    menuItemImg.setAttribute('src', elem.urlImgHover);
  });
};

export const createMenuItem = (tagName: string, className = '', elem: MenuItem): HTMLElement => {
  const menuItem: HTMLElement = createHtmlElement(tagName, className);
  const menuItemImg: HTMLElement = createHtmlElement('img');

  menuItemImg.setAttribute('src', elem.urlImg);
  menuItemImg.setAttribute('alt', elem.name);

  menuItem.appendChild(menuItemImg);

  addEventOnButton(elem, menuItem, menuItemImg);

  return menuItem;
};
