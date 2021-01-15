import { Request } from 'express';
import { EXPIRE_IN_TOKEN } from '@/constants/constants';
import { usersService } from '@/resources/users/user.controller';
import { v4 as uuidv4 } from 'uuid';
import { usersModel, Session } from '@/resources/users/user.model';
import { SESSION_EXPIRED, BAD_REFRESH_TOKEN} from './constants';
import {AuthUser} from './auth.model';

const getRefTokenExpiresInMilliseconds = (): number => {
  const refTokenExpiresInMilliseconds: number = new Date().getTime() + EXPIRE_IN_TOKEN;
  return Math.round(refTokenExpiresInMilliseconds / 1000);
};

export const getNewRefreshToken = async (id: number, req: Request): Promise<string> => {
  const newRefreshSession:Session = {
    user_id: id,
    ip: req.ip,
    expiresIn: getRefTokenExpiresInMilliseconds(),
    refreshToken: uuidv4(),
  };
 
  await usersModel.addRefreshSession(newRefreshSession);
 
  return newRefreshSession.refreshToken;
};

export const createCookieData = (value: string):Array<any> => [
  'refreshToken', 
  value, 
  {
    domain: 'localhost',
    path: '/',
    maxAge: getRefTokenExpiresInMilliseconds(),
    secure: false,
    httpOnly:true,
    signed:false,
    sameSite:true,
  },
];

const setInLogExpireToken = (expiresIn: number): void => {
  const nowTime = new Date().getTime();
  let logMessage;
  if (nowTime > expiresIn) {
    logMessage = SESSION_EXPIRED;
  }
};

export const RefreshTokensAction = async (req: Request):Promise<AuthUser> => {
  console.log('req=', req.headers.cookie?.slice(13));
  const {cookie} = req.headers;
  const cookieRefrehToken = cookie ? cookie.split(';').find(item => item.startsWith('refreshToken='))?.slice(13) : false;
  const reqRefreshToken = (cookie && cookieRefrehToken) || (req.cookies && req.cookies.refreshToken) || (req.body && req.body.refreshToken);
  console.log('reftoken=', reqRefreshToken);

  const oldRefreshSession = await usersModel.getSessionByRefreshToken(reqRefreshToken);
  
  if (!oldRefreshSession){
    throw new Error(BAD_REFRESH_TOKEN);
  }

  await usersModel.deleteSessionByRefreshToken(reqRefreshToken);
  console.log('2');
  setInLogExpireToken(oldRefreshSession.expiresIn);
  console.log('3');

  const user = await usersService.getUserById(oldRefreshSession.user_id);
  console.log('4');
  const authUser:AuthUser = {user, 'token':await getNewRefreshToken(user.user_id, req)};
  console.log('auth', authUser);
  return authUser;
 
};

