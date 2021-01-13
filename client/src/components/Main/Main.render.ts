import { createHtmlElement } from '@/utils/utils';
import { createMenuPage } from '../Menu/Menu.render';

export const renderMain = (link: string): HTMLElement => {
  
  const mainEl: HTMLElement = createHtmlElement('main', 'main');
  mainEl.id = 'main';

  switch (link) {
    case '/test-1':
      mainEl.innerHTML = '<div style="color:#fff; font-size:30px;font-weight:bold">HELLO WORLD</div>';
      break;
    case '/test-2':
      mainEl.innerHTML ='<div style="color:#fff; font-size:30px;font-weight:bold">TEST PAGE</div>';
      break;
    default:
      mainEl.appendChild(createMenuPage());
  }

  return mainEl;
};
