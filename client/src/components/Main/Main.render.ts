import { createHtmlElement } from '@/utils/utils';
import { renderAuthForms } from '@/components/Auth/Auth.render';
import { isUserAuthenticate, isUserJustRegistered } from '@/components/Auth/Auth.services';
import { createMenuPage } from '@/components/Menu/Menu.render';

export const renderMain = (link: string): HTMLElement => {
  const oldMain = document.querySelector('.main');
  if (oldMain) {
    oldMain.remove();
  }

  const mainEl: HTMLElement = createHtmlElement('main', 'main');
  mainEl.id = 'main';

   if (isUserAuthenticate() && !isUserJustRegistered()) {
    mainEl.appendChild(createMenuPage());
  } else {
    mainEl.appendChild(renderAuthForms());
  }
  
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
