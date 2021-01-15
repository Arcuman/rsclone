import { store } from '@/redux/store/rootStore';

interface TokenData {
  user?: number;
  login?: string;
  iat?: number;
  exp?: number;
}

export const isAccessTokenExpired = (): boolean => {
  const accessTokenExpDate = store.getState().authUser.tokenExpDate - 10;
  const nowTime = Math.floor(new Date().getTime() / 1000);

  return accessTokenExpDate <= nowTime;
};

export const parseTokenData = (accessToken: string): TokenData => {
  let tokenData: TokenData = {};

  try {
    const payloadArr = accessToken.split('.');

    tokenData = <TokenData>JSON.parse(atob(payloadArr[1]));
  } catch (error) {
    throw new Error(error);
  }

  return tokenData;
};
