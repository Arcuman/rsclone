import HttpStatus from 'http-status-codes';
import {webToken} from '@/helpers/webToken';
import { Request, Response } from 'express';
import {usersService} from '../users/user.controller';
import { authenticate, clientAuth } from './auth.controller';
import {User} from '../users/user.model';
import {getNewRefreshToken,createCookieData} from './refreshToken';

declare module 'express' {
  export interface Request {
    user?:User;
  }
}

const router = require('express').Router();

router.route('/').post(clientAuth, async (req:Request, res:Response) => {
  const userData = req.user!;
  if (!userData) {
    res
      .status(HttpStatus.FORBIDDEN)
      .send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
  }

  const userId = userData.user_id;
  const user = await usersService.getUserById(userId);

  if (!user) {
    res
      .status(HttpStatus.FORBIDDEN)
      .send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
  } else {
    
    const accessToken = webToken.createToken(user);
    const refreshToken = await getNewRefreshToken(userId);
    const cookies = createCookieData(refreshToken);

    const body = JSON.stringify({
      user, 
      accessToken,
      refreshToken
    });
  
    res
      .type('application/json')
      .json(body)
      .status(HttpStatus.OK)
      .end();
    
  }
});

export { router as authRouter, authenticate };
