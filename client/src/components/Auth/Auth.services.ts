import { LOGIN_ACTION } from './constants';

export const handleLogin = (): void => {
  const login = document.getElementById('login');
  const password = document.getElementById('password');
  const body = JSON.stringify({ login, password });

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const myInit: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    cache: 'default',
    body,
  };

  const myRequest = new Request(LOGIN_ACTION);
  // eslint-disable-next-line no-console
  console.log('before');
  fetch(LOGIN_ACTION, myInit)
    .then((response): void => {
      // eslint-disable-next-line no-console
      console.log('res=', response);
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log('error=', error));
  // eslint-disable-next-line no-console
  console.log('after');
};

export const handleClearForm = (event: MouseEvent): void => {
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');

  login.value = '';
  password.value = '';
};
