export interface State {
  accessToken: string;
  user_id: number;
  login: string;
  name: string;
  tokenExpDate:number;
  userRegistered: boolean;
  hasRefreshToken:boolean;
}

interface User {
  user_id: number;
  login: string;
  name: string;
}

export interface loginUser {
  login: string;
}

export interface AuthUser {
  user: User;
  accessToken: string;
  tokenExpDate?:number;
  hasRefreshToken:boolean;
}
