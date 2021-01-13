import { createHtmlElement } from '@/utils/utils';
import { renderAuthForms } from '@/components/Auth/Auth.render';
import { isUserAuthenticate, isUserJustRegistered } from '@/components/Auth/Auth.services';
import { createMenuPage } from '@/components/Menu/Menu.render';

export const renderMain = (): void => {
  const oldMain = document.querySelector('.main');
  if (oldMain) {
    oldMain.remove();
  }
  const mainEl: HTMLElement = createHtmlElement('main', 'main');
  document.body.appendChild(mainEl);

  if (isUserAuthenticate() && !isUserJustRegistered()) {
    mainEl.appendChild(createMenuPage());
  } else {
    mainEl.appendChild(renderAuthForms());
  }
};
