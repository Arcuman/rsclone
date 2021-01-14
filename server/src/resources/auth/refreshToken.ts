import { Request } from 'express';
import { EXPIRE_IN_TOKEN } from '@/constants/constants';
import { SESSION_EXPIRED } from './constants';
import { usersService } from '@/resources/users/user.controller';
import { v4 as uuidv4 } from 'uuid';
import { usersModel,Session } from '@/resources/users/user.model';

const getRefTokenExpiresInMilliseconds = (): number => {
  const refTokenExpiresInMilliseconds: number = new Date().getTime() + EXPIRE_IN_TOKEN;
  return refTokenExpiresInMilliseconds / 1000;
}

export const getNewRefreshToken = async (id: number, req: Request): Promise<string> => {
  const newRefreshSession:Session = {
    user_id: id,
    ip: req.ip,
    ua: <string>req.headers['User-Agent'],
    expiresIn: getRefTokenExpiresInMilliseconds(),
    refreshToken: uuidv4()
  };
  
  await usersModel.addRefreshSession(newRefreshSession);

  return newRefreshSession.refreshToken;
}

export const createCookieData = (value: string):Array<any> => {
  return [
            'refreshToken', 
            value, 
            {
              domain: 'localhost',
              path: '/',
              maxAge: getRefTokenExpiresInMilliseconds(),
              secure: false,
              httpOnly:true,
              signed:true,
              sameSite:true
            }
          ]
}

const setInLogExpireToken = (expiresIn: number): void => {
  const nowTime = new Date().getTime()
  let logMessage;
  if (nowTime > expiresIn) {
    logMessage = SESSION_EXPIRED;
  }
}

export const RefreshTokensAction = async (req: Request):Promise<string> => {
  const reqRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!reqRefreshToken) {
    throw new Error('Refresh token not provided');
  }

  const oldRefreshSession = await usersModel.getSessionByRefreshToken(reqRefreshToken);
  await usersModel.deleteSessionByRefreshToken(reqRefreshToken);
  setInLogExpireToken(oldRefreshSession.expiresIn);

  const user = await usersService.getUserById(oldRefreshSession.user_id)
  return getNewRefreshToken(user.user_id, req);

}

