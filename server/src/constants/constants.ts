import dotenv from 'dotenv';
import path from 'path';

export const EXPIRE_IN_TOKEN = 3600;
export const ENV_NAME = '../remoute.env';
// export const ENV_NAME = '../.env.local';
export const MAX_CARDS_IN_DECK = 10;
export const INITIAL = 'Initial';
export const INITIAL_LEVEL = 1;
export const INITIAL_EXP = 0;

export const HTTP_HEADERS = [
  ['Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept,Authorization,Origin'],
  ['Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'],
  ['Access-Control-Allow-Credentials', 'true'],
];

export const envPath = path.join(__dirname, ENV_NAME);

dotenv.config({
  path: envPath,
});
export const CURR_CLIENT_DOMAIN = process.env.CURR_CLIENT_DOMAIN || 'card-game-hfe.herokuapp.com';
export const REMOUTE_CLIENT_HOST = `https://${CURR_CLIENT_DOMAIN}`;

export const ORIGINS_HOST = [
  REMOUTE_CLIENT_HOST,
  'http://localhost:8080',
  'http://localhost:8081',
  'http://localhost:8082',
  'http://localhost:8083',
];
