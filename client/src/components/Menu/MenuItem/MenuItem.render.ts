import { createHtmlElement } from '@/utils/utils';

export const createMenuItem = (
  tagName: string,
  className = '',
  urlImg: string,
  name: string
): HTMLElement => {
  const menuItem: HTMLElement = createHtmlElement(tagName, className);
  const menuItemImg: HTMLElement = createHtmlElement('img');

  menuItemImg.setAttribute('src', urlImg);
  menuItemImg.setAttribute('alt', name);

  menuItem.appendChild(menuItemImg);
  return menuItem;
};
