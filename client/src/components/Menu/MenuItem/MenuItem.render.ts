import createHtmlElement from '../../../utils/utils';

const createMenuItem = (
  tagName: string,
  className = '',
  urlImg: string,
  name: string
): HTMLElement => {
  const menuItem: HTMLElement = createHtmlElement(tagName, className);
  // const menuItemBut: HTMLElement = createHtmlElement('button');
  const menuItemImg: HTMLElement = createHtmlElement('img');

  menuItemImg.setAttribute('src', urlImg);
  menuItemImg.setAttribute('alt', name);

  // menuItem.appendChild(menuItemBut);
  // menuItemBut.appendChild(menuItemImg);
  menuItem.appendChild(menuItemImg);
  return menuItem;
};

export default createMenuItem;
