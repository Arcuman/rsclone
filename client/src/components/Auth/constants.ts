const authForm = {
  login: 'Логин',
  password: 'Пароль',
  'confirm-password': 'Повторить пароль',
  name: 'Имя',
  auth: 'Авторизация',
  register: 'Регистрация',
};
const LOGIN_ACTION = 'http://localhost:3000/login';
const LOGOUT_ACTION = 'http://localhost:3000/logout';
const REGISTER_ACTION = 'http://localhost:3000/register';
const REFRESH_TOKEN = 'http://localhost:3000/refresh-tokens';

const HEADER_JSON = { 'Content-Type': 'application/json' };
const AUTH_IMAGES = {
  login: 'assets/images/menu/exit-button-ru.png',
  register: 'assets/images/menu/my-cards-button-ru.png',
};
const AUTH_LOGIN_EXISTS_ERROR_STATUS = 460;
const AUTH_MESSAGE = {
  login: 'Неверный логин/пароль',
  loginExists: 'Введенный логин уже существует',
  badData:'Обязательные поля не заполнены',
  notConfirmedPassword:'Пароли не совпадают',
  successRegistration:'Вы зарегистрированы',
};

export {
  authForm,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  HEADER_JSON,
  REFRESH_TOKEN,
  AUTH_MESSAGE,
  AUTH_LOGIN_EXISTS_ERROR_STATUS,
  AUTH_IMAGES,
};
