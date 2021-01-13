import './auth.scss';
import { createHtmlElement } from '@/utils/utils';
import { authForm } from './constants';
import { handleLogin, handleClearForm, handleRegister } from './Auth.services';

interface RenderFunction {
  (): HTMLElement;
}

const renderFormField = (name: string, type: string) => {
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

  form.appendChild(renderFormField('login', 'text'));
  form.appendChild(renderFormField('password', 'password'));

  const buttonOk = createHtmlElement('button', 'button-ok');
  buttonOk.innerHTML = 'Login';
  buttonOk.addEventListener('click', () => handleLogin());
  form.appendChild(buttonOk);

  const buttonCancel = createHtmlElement('button', 'button-cancel');
  buttonCancel.innerHTML = 'Cancel';
  buttonCancel.addEventListener('click', () => handleClearForm());
  form.appendChild(buttonCancel);

  return form;
};

const renderRegisterForm = (): HTMLElement => {
  const form = createHtmlElement('div', 'auth-form');

  form.appendChild(renderFormField('name', 'text'));
  form.appendChild(renderFormField('login', 'text'));
  form.appendChild(renderFormField('password', 'password'));

  const buttonOk = createHtmlElement('button', 'button-ok');
  buttonOk.innerHTML = 'Register';
  buttonOk.addEventListener('click', () => handleRegister());
  form.appendChild(buttonOk);

  const buttonCancel = createHtmlElement('button', 'button-cancel');
  buttonCancel.innerHTML = 'Cancel';
  buttonCancel.addEventListener('click', () => handleClearForm());
  form.appendChild(buttonCancel);

  return form;
};

const setCurrAuthForm = (event: Event) => {
  const target = <HTMLElement>event.target;
  if (target.tagName !== 'LI') {
    return;
  }
  const menuItemId = target.getAttribute('id');
  if (!target.classList.contains('active')) {
    target.classList.add('active');
    target.closest('li')?.classList.remove('active');
  }
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
  loginItem.innerHTML = 'Login';
  menuAuth.append(loginItem);

  const registerItem = createHtmlElement('li', 'auth-menu-register');
  registerItem.setAttribute('id', 'registerItem');
  registerItem.innerHTML = 'Register';
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
