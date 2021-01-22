import {BASE_HTTP_URL} from '@/constants/constants';

const authForm = {
  login: 'Логин',
  password: 'Пароль',
  'confirm-password': 'Повторить пароль',
  name: 'Имя',
  auth: 'Авторизация',
  register: 'Регистрация',
};

const LOGIN_ACTION = `${BASE_HTTP_URL}/login`;
const LOGOUT_ACTION = `${BASE_HTTP_URL}/logout`;
const REGISTER_ACTION = `${BASE_HTTP_URL}/register`;
const REFRESH_TOKEN = `${BASE_HTTP_URL}/refresh-tokens`;

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
