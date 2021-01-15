import { store } from '@/redux/store/rootStore';
import { AuthUser } from '@/types/types';
import { setAuthInformation, removeAuthInformation, userRegistered } from '@/redux/actions/actions';
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  HEADER_JSON,
  REFRESH_TOKEN,
} from './constants';
import { parseTokenData, isAccessTokenExpired } from './webToken.service';

const refreshTokenSession = async (): Promise<boolean> => {
  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    body: '',
  };

  return fetch(REFRESH_TOKEN, myInit)
    .then((response): Promise<string> => response.json())
    .then((obj: string) => {
      const authObj: AuthUser = <AuthUser>JSON.parse(obj);

      if (!authObj.accessToken) {
        return false;
      }

      const { exp } = parseTokenData(authObj.accessToken);
      authObj.tokenExpDate = exp;

      store.dispatch(setAuthInformation(authObj));
      localStorage.setItem('refreshToken', '1');

      return true;
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const isUserAuthenticate = async (): Promise<boolean> => {
  const { accessToken } = store.getState().authUser;

  if (accessToken !== '' && !isAccessTokenExpired()) {
    return true;
  }

  if (localStorage.getItem('refreshToken')) {
    await refreshTokenSession();
    return store.getState().authUser.accessToken !== '';
  }

  return false;
};

export const isUserJustRegistered = (): boolean => {
  const user = store.getState().authUser;
  return user.userRegistered;
};

export const handleRegister = (): void => {
  const name = <HTMLInputElement>document.getElementById('name');
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');
  const message = <HTMLInputElement>document.querySelector('.auth-message');

  const body = JSON.stringify({ name: name.value, login: login.value, password: password.value });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    body,
  };

  fetch(REGISTER_ACTION, myInit)
    .then((response): void => {
      if (response.status !== 200) {
        throw new Error();
      }

      store.dispatch(userRegistered());
    })
    .catch(() => {
      message.innerHTML = 'Error! Has already registered';
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
    credentials: 'include',
    body,
  };

  fetch(LOGIN_ACTION, myInit)
    .then((response): Promise<string> => response.json())
    .then((obj: string) => {
      const authObj: AuthUser = <AuthUser>JSON.parse(obj);
      const { exp } = parseTokenData(authObj.accessToken);
      authObj.tokenExpDate = exp;
      store.dispatch(setAuthInformation(authObj));
      localStorage.setItem('refreshToken', '1');
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const handleLogout = (): void => {
  const { login } = store.getState().authUser;
  const body = JSON.stringify({ login });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    body,
  };

  fetch(LOGOUT_ACTION, myInit)
    .then((): void => {
      store.dispatch(removeAuthInformation(login));
      localStorage.removeItem('refreshToken');
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
