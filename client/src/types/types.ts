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
}

export interface ShadowOptions {
  OFFSET_X: number;
  OFFSET_Y: number;
  TINT: number;
  ALPHA: number;
}
