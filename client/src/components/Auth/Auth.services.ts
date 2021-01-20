import { store } from '@/redux/store/rootStore';
import { AuthUser } from '@/types/types';
import { StatusCodes } from 'http-status-codes';
import {
  setAuthInformation,
  removeAuthInformation,
  userRegistered,
  endGame,
} from '@/redux/actions/actions';
import { browserHistory } from '@/router/history';
import { AUTH_URL, MENU_URL } from '@/router/constants';
import {
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  HEADER_JSON,
  REFRESH_TOKEN,
  AUTH_ERRORS,
} from './constants';
import { parseTokenData, isAccessTokenExpired } from './webToken.service';

const requestInit: RequestInit = {
  method: 'POST',
  headers: HEADER_JSON,
  mode: 'cors',
  cache: 'default',
  credentials: 'include',
  body: '',
};

const refreshTokenSession = async (): Promise<boolean> =>
  fetch(REFRESH_TOKEN, requestInit)
    .then(
      (response): Promise<string> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((bodyValue: string) => {
      const authObj: AuthUser = <AuthUser>JSON.parse(bodyValue);

      if (!authObj.accessToken) {
        return false;
      }

      const { exp } = parseTokenData(authObj.accessToken);
      authObj.tokenExpDate = exp;

      store.dispatch(setAuthInformation(authObj));
      localStorage.setItem('refreshToken', 'true');

      return true;
    })
    .catch(error => {
      throw new Error(error);
    });

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

  requestInit.body = body;

  fetch(REGISTER_ACTION, requestInit)
    .then((response): void => {
      if (response.status !== StatusCodes.OK) {
        throw new Error();
      }

      store.dispatch(userRegistered());
    })
    .catch(() => {
      message.innerHTML = AUTH_ERRORS.register;
    });
};

export const handleLogin = (): void => {
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');

  const body = JSON.stringify({ login: login.value, password: password.value });

  requestInit.body = body;

  fetch(LOGIN_ACTION, requestInit)
    .then(
      (response): Promise<string> => {
        if (response.status !== StatusCodes.OK) {
          throw new Error();
        }
        return response.json();
      },
    )
    .then((bodyValue: string) => {
      const authObj: AuthUser = <AuthUser>JSON.parse(bodyValue);

      if (!authObj.accessToken) {
        throw new Error();
      }
      const { exp } = parseTokenData(authObj.accessToken);
      authObj.tokenExpDate = exp;
      store.dispatch(setAuthInformation(authObj));
      localStorage.setItem('refreshToken', 'true');
      browserHistory.push(MENU_URL);
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log(AUTH_ERRORS.login);
    });
};

export const handleLogout = (): void => {
  const { login } = store.getState().authUser;
  const body = JSON.stringify({ login });

  requestInit.body = body;

  fetch(LOGOUT_ACTION, requestInit)
    .then((): void => {
      store.dispatch(removeAuthInformation(login));
      store.dispatch(endGame());
      localStorage.removeItem('refreshToken');
      browserHistory.push(AUTH_URL);
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
