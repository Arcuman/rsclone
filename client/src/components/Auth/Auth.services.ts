import { store } from '@/redux/store/rootStore';
import { setAuthInformation, userRegistered } from '@/redux/actions/actions';
import { LOGIN_ACTION, REGISTER_ACTION, HEADER_JSON } from './constants';

export const isUserAuthenticate = (): boolean => {
  const { token } = store.getState().authUser;
  return token !== '';
};

export const isUserJustRegistered = (): boolean => {
  const user = store.getState().authUser;
  return user.userRegistered;
};

export const handleRegister = (): void => {
  const name = <HTMLInputElement>document.getElementById('name');
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');

  const body = JSON.stringify({ name: name.value, login: login.value, password: password.value });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    body,
  };

  fetch(REGISTER_ACTION, myInit)
    .then((response): void => {
      if (response.status === 200) {
        store.dispatch(userRegistered());
      }
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const handleLogin = (): void => {
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');

  const body = JSON.stringify({ login: login.value, password: password.value });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    body,
  };

  fetch(LOGIN_ACTION, myInit)
    .then((response): Promise<string> => response.json())
    .then(obj => {
      store.dispatch(setAuthInformation(JSON.parse(obj)));
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const handleClearForm = (): void => {
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');

  login.value = '';
  password.value = '';
};
