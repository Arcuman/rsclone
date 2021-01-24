import { BASE_HTTP_URL } from '@/constants/constants';

const authForm = {
  login: 'Логин',
  password: 'Пароль',
  'confirm-password': 'Повторить пароль',
  name: 'Имя',
  auth: 'Авторизация',
  register: 'Регистрация',
};

const LOGIN_ACTION = `${<string>BASE_HTTP_URL}/login`;
const LOGOUT_ACTION = `${<string>BASE_HTTP_URL}/logout`;
const REGISTER_ACTION = `${<string>BASE_HTTP_URL}/register`;
const REFRESH_TOKEN = `${<string>BASE_HTTP_URL}/refresh-tokens`;

const AUTH_IMAGES = {
  login: 'assets/images/enter_button.png',
  register: 'assets/images/send_button.png',
};

const AUTH_LOGIN_EXISTS_ERROR_STATUS = 460;
const AUTH_MESSAGE = {
  login: 'Неверный логин/пароль',
  loginExists: 'Введенный логин уже существует',
  badData: 'Обязательные поля не заполнены',
  notConfirmedPassword: 'Пароли не совпадают',
  successRegistration: 'Вы зарегистрированы',
};

export {
  authForm,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  REGISTER_ACTION,
  REFRESH_TOKEN,
  AUTH_MESSAGE,
  AUTH_LOGIN_EXISTS_ERROR_STATUS,
  AUTH_IMAGES,
};
