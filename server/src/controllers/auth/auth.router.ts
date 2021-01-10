import HttpStatus from 'http-status-codes';
import {webToken} from '@/helpers/webToken';
import { Request, Response } from 'express';
import {usersService} from '../users/user.controller';
import { authenticate, authenticateLocal } from './auth.controller';
import {User} from '../users/user.model';

declare module 'express' {
  export interface Request {
    user?:User;
  }
}

const router = require('express').Router();

router.route('/').post(authenticateLocal, async (req:Request, res:Response) => {
  // console.log('in login');
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
    const token = webToken.createToken(user);
    res.send({ user, token });
  }
});

export { router as authRouter, authenticate };
