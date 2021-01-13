import { createHtmlElement } from '@/utils/utils';
import { createMenuPage } from '../Menu/Menu.render';

export const renderMain = (link: string): HTMLElement => {
  const mainEl: HTMLElement = createHtmlElement('main', 'main');
  mainEl.id = 'main';

  switch (link) {
    case '/test-1':
      mainEl.append('<div>HELLO WORLD</div>');
      break;
    case '/test-2':
      mainEl.append('<div>TEST PAGE</div>');
      break;
    default:
      mainEl.appendChild(createMenuPage());
  }

  return mainEl;
};
