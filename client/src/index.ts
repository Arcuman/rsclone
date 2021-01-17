import 'normalize.css';
import './styles/styles.scss';
import { game } from './components/GameBoard/GameBoard.render';
import { store } from './redux/store/rootStore';
import { createHtmlElement } from './utils/utils';
// import { hobaPage, homePage, testPage } from './router/routers';
import { homePage } from './router/routers';
import { createLinkButton } from './router/createLinkButton';

game();

window.onload = () => {
  window.location.replace('#/home');
  homePage.then((elementHTML: HTMLElement) => document.body.append(elementHTML));
};

const linkHome: HTMLElement = createLinkButton('#/home', 'HOME PAGE', homePage);

/* const linkTest: HTMLElement = createLinkButton('#/home/test-page', 'TEST PAGE', testPage);
const linkHoba: HTMLElement = createLinkButton('#/home/hoba', 'HOBA', hobaPage); */

const navBar: HTMLElement = createHtmlElement('div', 'nav-bar');
navBar.append(linkHome); // , linkTest, linkHoba);
document.body.append(navBar);

store.subscribe(() => {
  const state = store.getState();
});
