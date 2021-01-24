export const BASE_HTTP_URL = process.env.BASE_URL?.replace(/\/$/, '');
export const WEBSOCKET_HOST_PORT = 'ws://localhost:3000';
export const WEBSOCKET_PATH = '/websocket';
export const HEADER_JSON = { 'Content-Type': 'application/json' };