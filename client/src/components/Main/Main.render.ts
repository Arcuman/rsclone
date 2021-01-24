import './main.scss';
import { createHtmlElement } from '@/utils/utils';
import { renderAuthForms } from '@/components/Auth/Auth.render';
import { AUTH_URL, ERROR_404_URL } from '@/router/constants';

export const renderMain = (link: string): HTMLElement => {
  const mainEl = createHtmlElement('main', 'main');
  mainEl.id = 'main';

  switch (link) {
    case AUTH_URL:
      mainEl.appendChild(renderAuthForms());
      break;
    case ERROR_404_URL:
      mainEl.innerHTML = '<h1>Page Not Found</h1>';
      break;
    default:
      mainEl.appendChild(renderAuthForms());
  }
  return mainEl;
};
