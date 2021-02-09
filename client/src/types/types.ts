export interface AuthUserState {
  accessToken: string;
  user_id: number;
  login: string;
  name: string;
  tokenExpDate: number;
  userRegistered: boolean;
  hasRefreshToken: boolean;
}

export interface GameState {
  game: Phaser.Game | null | undefined;
}

interface User {
  user_id: number;
  login: string;
  name: string;
}

export interface AuthUser {
  user: User;
  accessToken: string;
  tokenExpDate?: number;
  hasRefreshToken: boolean;
}

export interface TextDecoration {
  FONT_SIZE: string;
  FONT_FAMILY: string;
  FONT_COLOR: string;
  TEXT_OUTLINE_COLOR: string;
  TEXT_OUTLINE_SIZE: number;
  TEXT_DEPTH: number;
  IS_SET_ORIGIN?: boolean;
}

export interface ShadowOptions {
  OFFSET_X: number;
  OFFSET_Y: number;
  TINT: number;
  ALPHA: number;
}

export interface PositionText {
  TEXT_X: number;
  TEXT_Y: number;
}

export interface ImageState {
  IDLE: string;
  HOVER: string;
  CLICK: string;
}

export interface menuImages {
  MENU_START_GAME: ImageState;
  MENU_MY_CARDS: ImageState;
  MENU_SETTINGS: ImageState;
  MENU_EXIT: ImageState;
  MENU_BUTTON: ImageState;
  MUTE_ON_BUTTON: ImageState;
  MUTE_OFF_BUTTON: ImageState;
}
