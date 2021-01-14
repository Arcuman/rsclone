interface User {
  user_id: number;
  login: string;
  name: string;
}

export interface AuthUser {
  user: User;
  token?: string;
}

export const SET_AUTH_USER = 'SET_AUTH_USER';
export const USER_REGISTERED = 'USER_REGISTERED';
