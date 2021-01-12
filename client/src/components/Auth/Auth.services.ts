import { LOGIN_ACTION, REGISTER_ACTION, HEADER_JSON, authForm } from './constants';

interface User{
  user_id: number;
  login: string;
  name:string;
  
}

interface AuthUser{
  user:User;
  token?:string;

}

const checkAuth = ():boolean =>true;

const setUser = (user:User):void =>{

};
const setToken = (token:string):void =>{
/*
fetch(url, { 
   method: 'POST', 
   headers: new Headers({
     'Authorization': 'Bearer ' + token,
     'Content-Type': 'application/json'
   }), 
   body: {  }
  });
*/
};

export const handleRegister = ():void =>{
  const name = <HTMLInputElement>document.getElementById('name');
  const login = <HTMLInputElement>document.getElementById('login');
  const password =  <HTMLInputElement>document.getElementById('password');

  const body = JSON.stringify({ 'name':name.value, 'login':login.value, 'password':password.value });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    body,
  };
  
  fetch(REGISTER_ACTION, myInit)
    .then((response): Promise<AuthUser> => response.json())
    .then(obj=>{
      //! !! присвоить данные стейту
      // eslint-disable-next-line no-console
      console.log(obj);
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log('error=', error));

};

export const handleLogin = (): void => {
  const login = <HTMLInputElement>document.getElementById('login');
  const password =  <HTMLInputElement>document.getElementById('password');

  const body = JSON.stringify({ 'login':login.value, 'password':password.value });

  const myInit: RequestInit = {
    method: 'POST',
    headers: HEADER_JSON,
    mode: 'cors',
    cache: 'default',
    body,
  };

  fetch(LOGIN_ACTION, myInit)
    .then((response): Promise<AuthUser> => response.json())
    .then(obj=>{
      //! !! присвоить данные стейту
      if (obj.token){
        setToken(obj.token);
      }
      if (obj.user){
        setUser(obj.user);
      }
      // eslint-disable-next-line no-console
      console.log(obj);
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log('error=', error));
 
};

export const handleClearForm = (): void => {
  const login = <HTMLInputElement>document.getElementById('login');
  const password = <HTMLInputElement>document.getElementById('password');

  login.value = '';
  password.value = '';
};

