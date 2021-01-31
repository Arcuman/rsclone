import './auth.scss';
import { createHtmlElement } from '@/utils/utils';
import { copyright } from '@/constants/constants';
import { authForm, AUTH_AUDIO, AUDIO_PATH } from './constants';
import { handleLogin, handleRegister, buttonStyleClick, playAudio } from './Auth.services';

interface RenderFunction {
  (): HTMLElement;
}

const renderFormField = (name: string, type: string): HTMLElement => {
  const label = createHtmlElement('label');
  label.innerHTML = <string>authForm[name];
  const input = createHtmlElement('input', name);
  input.setAttribute('id', name);
  input.setAttribute('type', type);
  input.addEventListener('focus', () => playAudio(AUTH_AUDIO.inputA.name));
  input.addEventListener('keyup', () => playAudio(AUTH_AUDIO.cursor.name));
  label.appendChild(input);
  return label;
};

const renderLoginForm = (): HTMLElement => {
  const form = createHtmlElement('div', 'auth-form');
  form.appendChild(createHtmlElement('div', 'auth-message'));
  const inputWrapper = createHtmlElement('div', 'auth-input-wrapper');

  inputWrapper.appendChild(renderFormField('login', 'text'));
  inputWrapper.appendChild(renderFormField('password', 'password'));
  form.appendChild(inputWrapper);

  const buttonOk = <HTMLImageElement>createHtmlElement('button', 'button-enter');
  buttonOk.addEventListener('mouseover', () => playAudio(AUTH_AUDIO.btnOver.name));
  buttonOk.addEventListener('mousedown', event => buttonStyleClick(event));
  buttonOk.addEventListener('mouseup', event => handleLogin(event));
  form.appendChild(buttonOk);

  return form;
};

const renderRegisterForm = (): HTMLElement => {
  const form = createHtmlElement('div', 'auth-form');
  form.appendChild(createHtmlElement('div', 'auth-message'));
  const inputWrapper = createHtmlElement('div', 'auth-input-wrapper register');

  inputWrapper.appendChild(renderFormField('name', 'text'));
  inputWrapper.appendChild(renderFormField('login', 'text'));
  inputWrapper.appendChild(renderFormField('password', 'password'));
  inputWrapper.appendChild(renderFormField('confirm-password', 'password'));

  form.appendChild(inputWrapper);

  const buttonSend = <HTMLImageElement>createHtmlElement('button', 'button-send');
  buttonSend.addEventListener('mouseover', () => playAudio(AUTH_AUDIO.btnOver.name));
  buttonSend.addEventListener('mousedown', event => buttonStyleClick(event));
  buttonSend.addEventListener('mouseup', event => handleRegister(event));
  form.appendChild(buttonSend);

  return form;
};

const setCurrAuthForm = (event: Event) => {
  const target = <HTMLElement>event.target;
  if (target.tagName !== 'LI') {
    return;
  }
  const menuItemId = target.getAttribute('id');
  const menu = document.querySelector('.auth-menu');
  const menuItems = menu?.childNodes;
  menuItems?.forEach(item => {
    const menuElement = <HTMLElement>item;
    menuElement.classList.remove('active');
  });

  target.classList.add('active');

  document.querySelector('.auth-form')?.remove();
 
  const renderFormFuncs = { loginItem: renderLoginForm, registerItem: renderRegisterForm };
  const renderAuthForm: RenderFunction = <RenderFunction>renderFormFuncs[menuItemId!];
  menu?.after(renderAuthForm());
};

const renderMenuAuth = (): HTMLElement => {
  const menuAuth = createHtmlElement('ul', 'auth-menu');

  const loginItem = createHtmlElement('li', 'auth-menu-login active');
  loginItem.setAttribute('id', 'loginItem');
  loginItem.innerHTML = authForm.auth;
  loginItem.addEventListener('mousedown', () => playAudio(AUTH_AUDIO.linkPress.name));
  menuAuth.append(loginItem);

  const slashItem = createHtmlElement('div');
  slashItem.innerHTML = '/';
  menuAuth.append(slashItem);

  const registerItem = createHtmlElement('li', 'auth-menu-register');
  registerItem.setAttribute('id', 'registerItem');
  registerItem.addEventListener('mousedown', () => playAudio(AUTH_AUDIO.linkPress.name));
  registerItem.innerHTML = authForm.register;
  menuAuth.append(registerItem);

  menuAuth.addEventListener('click', event => setCurrAuthForm(event));

  return menuAuth;
};

const renderAudioContainer = (): HTMLElement => {
  const audioContainer = document.createElement('div');

  let audioKeyElement;
  const soundKeys = Object.values(AUTH_AUDIO);

  soundKeys.forEach(soundKey => {
    audioKeyElement = document.createElement('audio');
    audioKeyElement.src = `${AUDIO_PATH}${soundKey.audio}`;
    audioKeyElement.dataset.audio = soundKey.name;
    audioContainer.appendChild(audioKeyElement);
  });
  return audioContainer;
};

const renderAutorsBlock = (authors:Array<string[]>, className: string): HTMLElement => {
  const authorsWrapper = createHtmlElement('div', className);
  authors.forEach(author => {
    const authorLink = <HTMLLinkElement>createHtmlElement('a');
    [authorLink.innerHTML, authorLink.href] = author;
    authorsWrapper.appendChild(authorLink);
  });

  return authorsWrapper;
};

const renderCopyright = (): HTMLElement => {
  const container = createHtmlElement('div', 'copyright');

  const authorsWrapperL = renderAutorsBlock(copyright.authors.slice(0, 2), 'copyright-authors-left');
  container.appendChild(authorsWrapperL);

  const logo = createHtmlElement('div', 'copyright-logo');
  const logoImg = <HTMLImageElement>createHtmlElement('img');
  logoImg.src = copyright.rssLogo;
  logo.appendChild(logoImg);
  container.appendChild(logo);

  const authorsWrapperR = renderAutorsBlock(copyright.authors.slice(2, 4), 'copyright-authors-right');
  container.appendChild(authorsWrapperR);

  return container;
};

export const renderAuthForms = (): HTMLElement => {
  const wrapper = createHtmlElement('div', 'auth-wrapper');
  wrapper.appendChild(renderMenuAuth());
  wrapper.appendChild(renderLoginForm());
  wrapper.appendChild(renderAudioContainer());
  wrapper.appendChild(renderCopyright());
  return wrapper;
};