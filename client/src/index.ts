import test from '@/services/gameSockets.services';
import { store } from './redux/store/rootStore';

import './styles/styles.scss';
import { createHtmlElement } from './utils/utils';
import { hoba, homePage, testPage } from './router/routers';
import { createLinkButton } from './router/createLinkButton';

test();

window.onload = () => {
  window.location.replace('#/home');
  homePage.then(res => document.body.append(res!));
};

const linkHome = createLinkButton('#/home', 'HOME PAGE', homePage);
const linkTest = createLinkButton('#/home/test-page', 'TEST PAGE', testPage);
const linkHoba = createLinkButton('#/home/hoba', 'HOBA', hoba);

const navBar = createHtmlElement('div', 'nav-bar');
navBar.append(linkHome, linkTest, linkHoba);
document.body.append(navBar);

store.subscribe(() => {
  const state = store.getState();
});
