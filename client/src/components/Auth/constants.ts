const authForm = { login: 'login', password: 'password', name: 'name' };
const LOGIN_ACTION = 'http://localhost:3000/login';
const LOGOUT_ACTION = 'http://localhost:3000/logout';
const REGISTER_ACTION = 'http://localhost:3000/register';
const REFRESH_TOKEN = 'http://localhost:3000/refresh-tokens';
const HEADER_JSON = { 'Content-Type': 'application/json' };

export { authForm, LOGIN_ACTION, LOGOUT_ACTION, REGISTER_ACTION, HEADER_JSON, REFRESH_TOKEN };
