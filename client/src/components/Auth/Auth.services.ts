import { store } from '@/redux/store/rootStore';
import {AuthUser, loginUser} from '@/types/types';
import { setAuthInformation, removeAuthInformation, userRegistered } from '@/redux/actions/actions';
import { LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION, HEADER_JSON, REFRESH_TOKEN } from './constants';
import {parseTokenData} from './webToken.service';

const refreshTokenSession = async ():Promise<boolean> =>{
  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    credentials:'include',
    body:'',
  };
  
  return fetch(REFRESH_TOKEN, myInit)
    .then((response): Promise<string> => response.json())
    .then((obj:string)=> {
      const authObj:AuthUser = JSON.parse(obj);
      if (!authObj.accessToken){
        return false;
      }
      const {exp} = parseTokenData(authObj.accessToken);
      authObj.tokenExpDate = <number>exp;
      store.dispatch(setAuthInformation(authObj));
      localStorage.setItem('refreshToken', '1');
      return true;
    })
    .catch(error => {
      throw new Error(error);
    });

};

export const isUserAuthenticate = (): boolean => {
  console.log('check auth');
  const { accessToken } = store.getState().authUser;
  if (accessToken !== ''){
    return true;
  }
   
  if (localStorage.getItem('refreshToken')){
    const isAuth = refreshTokenSession();
    console.log('token th ===', isAuth);
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

  const body = JSON.stringify({ name: name.value, login: login.value, password: password.value });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    credentials:'include',
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
    credentials:'include',
    body,
  };

  fetch(LOGIN_ACTION, myInit)
    .then((response): Promise<string> => response.json())
    .then((obj:string)=> {
      const authObj:AuthUser = JSON.parse(obj);
      const {exp} = parseTokenData(authObj.accessToken);
      authObj.tokenExpDate = <number>exp;
      store.dispatch(setAuthInformation(authObj));
      localStorage.setItem('refreshToken', '1');
    })
    .catch(error => {
      throw new Error(error);
    });
};

export const handleLogout = (): void => {
  const body = JSON.stringify({ login: store.getState().authUser.login});

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    credentials:'include',
    body,
  };

  fetch(LOGOUT_ACTION, myInit)
    .then((response): Promise<string> => response.json())
    .then((obj:string) => {
      const loginUserObj:loginUser = JSON.parse(obj);
      store.dispatch(removeAuthInformation(loginUserObj.login));
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

