export const BASE_HTTP_URL = process.env.BASE_URL?.replace(/\/$/, '');
export const WEBSOCKET_HOST_PORT = 'ws://localhost:3000';
export const WEBSOCKET_PATH = '/websocket';
export const HEADER_JSON = { 'Content-Type': 'application/json' };
export const AUDIO_CONFIG = { volume: { bg: 0.3, button: 0.5, card: 0.5 } };
export const TINT_VALUE_CLICK = 0x59503d;
export const IS_MUTE_ON_LS_PARAM = 'isMuteOn_cardGame';
export const COVER_CARD = {
  POS_Y: 90,
  ID: -1,
  MANA_COST: 0,
  ATTACK: 0,
  HEALTH: 0,
  ISACTIVE: false,
};

export const copyright = {
  authors: [
    ['Arcuman', 'https://github.com/Arcuman'],
    ['Annastartseva', 'https://github.com/annastartseva'],
    ['Halinapp', 'https://github.com/halinapp'],
    ['Ilya-Baklanov', 'https://github.com/Ilya-Baklanov'],
  ],
  rssLogo: '../assets/images/logo_rs.png',
};
