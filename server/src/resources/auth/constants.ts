const ERR_LOGIN_MESSAGE = 'Bad login/password combination';
const AUTH_FORM_FIELDS = { usernameField: 'login', passwordField: 'password' };
const SESSION_EXPIRED = 'Session expired';

const AUTH_FAILURE_REDIRECT_URL = '/login';
const AUTH_LOGOUT = '/logout';
const AUTH_REFRESH_TOKEN = '/refresh-tokens';
const AUTH_REGISTER = '/register';
const REFRESH_TOKEN = 'refreshToken';

const BAD_REFRESH_TOKEN = 'Refresh token not exist';

export { ERR_LOGIN_MESSAGE, AUTH_FORM_FIELDS, AUTH_FAILURE_REDIRECT_URL, AUTH_REFRESH_TOKEN, AUTH_REGISTER, SESSION_EXPIRED, AUTH_LOGOUT, BAD_REFRESH_TOKEN, REFRESH_TOKEN };