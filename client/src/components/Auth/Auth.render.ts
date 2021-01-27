import './auth.scss';
import { createHtmlElement } from '@/utils/utils';
import { authForm } from './constants';
import { handleLogin, handleRegister, buttonStyleClick } from './Auth.services';

interface RenderFunction {
  (): HTMLElement;
}

const renderFormField = (name: string, type: string): HTMLElement => {
  const label = createHtmlElement('label');
  label.innerHTML = <string>authForm[name];
  const input = createHtmlElement('input', name);
  input.setAttribute('id', name);
  input.setAttribute('type', type);
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
  const menuItems = document.querySelector('.auth-menu')?.childNodes;
  menuItems?.forEach(item => {
    const menuElement = <HTMLElement>item;
    menuElement.classList.remove('active');
  });

  target.classList.add('active');

  document.querySelector('.auth-form')?.remove();
  const authWrapper = document.querySelector('.auth-wrapper');

  const renderFormFuncs = { loginItem: renderLoginForm, registerItem: renderRegisterForm };
  const renderAuthForm: RenderFunction = <RenderFunction>renderFormFuncs[menuItemId!];
  authWrapper?.append(renderAuthForm());
};

const renderMenuAuth = (): HTMLElement => {
  const menuAuth = createHtmlElement('ul', 'auth-menu');

  const loginItem = createHtmlElement('li', 'auth-menu-login active');
  loginItem.setAttribute('id', 'loginItem');
  loginItem.innerHTML = authForm.auth;
  menuAuth.append(loginItem);

  const slashItem = createHtmlElement('div');
  slashItem.innerHTML = '/';
  menuAuth.append(slashItem);

  const registerItem = createHtmlElement('li', 'auth-menu-register');
  registerItem.setAttribute('id', 'registerItem');
  registerItem.innerHTML = authForm.register;
  menuAuth.append(registerItem);

  menuAuth.addEventListener('click', event => setCurrAuthForm(event));

  return menuAuth;
};

export const renderAuthForms = (): HTMLElement => {
  const wrapper = createHtmlElement('div', 'auth-wrapper');
  wrapper.appendChild(renderMenuAuth());
  wrapper.appendChild(renderLoginForm());
  return wrapper;
};
