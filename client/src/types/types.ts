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
