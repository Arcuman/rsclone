/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import UniversalRouter from 'universal-router';
import generateUrls from 'universal-router/generateUrls';

import test from '@/services/gameSockets.services';
import { renderMain } from '@/components/Main/Main.render';
import { store } from './redux/store/rootStore';

import './styles/styles.scss';
import { createHtmlElement } from './utils/utils';

const routes = [
  { name: 'home', path: '/home', action: () => renderMain('default') },
  { name: 'test-page', path: '/home/test-page', action: () => renderMain('/test-1') },
  { name: 'test-page-hoba', path: '/home/test-page/hoba', action: () => renderMain('/test-2') },
];

const router = new UniversalRouter(routes);

const url = generateUrls(router);

const homePage = router.resolve({ pathname: url('home') }).then(res => res);
homePage.then(res => document.body.append(res!));
const testPage = router.resolve({ pathname: url('test-page') }).then(res => res);
const hoba = router.resolve({ pathname: url('test-page-hoba') }).then(res => res);

const oldMain = document.body.lastChild;

const linkHome = document.createElement('a');
linkHome.setAttribute('href', '#/home');
linkHome.append('HOME PAGE');
linkHome.addEventListener('click', () => {
  oldMain?.remove();
  homePage.then(res => document.body.append(res!));
});

const linkTest = document.createElement('a');
linkTest.setAttribute('href', '#/home/test-page');
linkTest.append('TEST PAGE');
linkTest.addEventListener('click', () => {
  oldMain?.remove();
  testPage.then(res => document.body.append(res!));
});

const linkHoba = document.createElement('a');
linkHoba.setAttribute('href', '#/home/test-page/hoba');
linkHoba.append('HOBA');
linkHoba.addEventListener('click', () => {
  oldMain?.remove();
  hoba.then(res => document.body.append(res!));
});

const navBar = createHtmlElement('div', 'nav-bar');
navBar.append(linkHome, linkTest, linkHoba);
document.body.append(navBar);

store.subscribe(() => {
  const state = store.getState();
});
