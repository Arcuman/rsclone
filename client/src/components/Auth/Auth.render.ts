import { createHtmlElement, createHtmlFormElement } from '@/utils/utils';
import { authForm } from './constants';
import { handleLogin, handleClearForm } from './Auth.services';

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
  buttonCancel.addEventListener('click', event => handleClearForm(event));
  form.appendChild(buttonCancel);

  return form;
};

export default renderLoginForm;
