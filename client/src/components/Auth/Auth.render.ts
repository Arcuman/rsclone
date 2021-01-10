import { createHtmlElement, createHtmlFormElement } from '@/utils/utils';
import { authForm, LOGIN_ACTION } from './constants';

const renderFormField = (name: string, type: string) => {
  const label = createHtmlElement('label');
  label.innerHTML = <string>authForm[name];
  const input = createHtmlElement('input', name);
  input.setAttribute('type', type);
  label.appendChild(input);
  return label;
};

const renderLoginForm = (): HTMLFormElement => {
  const form = createHtmlFormElement('post', 'authForm', LOGIN_ACTION, 'authForm');

  form.appendChild(renderFormField('login', 'text'));
  form.appendChild(renderFormField('password', 'password'));
  const buttonOk = createHtmlElement('button', 'button-ok');
  buttonOk.innerHTML = 'Login';
  const buttonCancel = createHtmlElement('button', 'button-cancel');
  buttonCancel.innerHTML = 'Cancel';

  return form;
};

export default renderLoginForm;
