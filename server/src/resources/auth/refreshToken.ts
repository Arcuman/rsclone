const {  CookieEntity, AppError, errorCodes } = require('supra-core')
const { addRefreshSession } = require('../common/addRefreshSession')
const { verifyRefreshSession } = require('../common/verifyRefreshSession')
const { RefreshSessionEntity } = require('../common/RefreshSessionEntity')
const { UserDAO } = require('../../../dao/UserDAO')
const { RefreshSessionDAO } = require('../../../dao/RefreshSessionDAO')

import { Request } from 'express';
import {EXPIRE_IN_TOKEN} from '@/constants/constants';
          
const  getRefTokenExpiresInMilliseconds = ():number =>{
    const refTokenExpiresInMilliseconds:number = new Date().getTime() + EXPIRE_IN_TOKEN;
    return refTokenExpiresInMilliseconds / 1000;
}

export const  getNewRefreshToken = async(id:number, req:Request) =>{
    const newRefreshSession = new RefreshSessionEntity({
        userId: id,
        ip: req.ip,
        ua: req.headers['User-Agent'],
        expiresIn: getRefTokenExpiresInMilliseconds();
    });
  
    await addRefreshSession(newRefreshSession);
    return newRefreshSession.refreshToken;
}

export const createCookieData = (value:string) =>{
    return [
        new CookieEntity({
          name: 'refreshToken',
          value: value,
          domain: 'localhost',
          path: '/',
          maxAge: getRefTokenExpiresInMilliseconds(),
          secure: false 
        })
      ]
}

export const  RefreshTokensAction = async (req:Request) => {
    const reqRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!reqRefreshToken) {
      throw new Error('Refresh token not provided' );
    }
  
    const oldRefreshSession = await RefreshSessionDAO.getByRefreshToken(reqRefreshToken);
    await RefreshSessionDAO.baseRemoveWhere({ refreshToken: reqRefreshToken });
    await verifyRefreshSession(new RefreshSessionEntity(oldRefreshSession));
    const user = await UserDAO.baseGetById(oldRefreshSession.userId);

    return getNewRefreshToken(user.id, req);
  
}

