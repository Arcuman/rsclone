import { authenticate, clientAuth, sendAuthResponseToClient } from './auth.controller';
import { User } from '../users/user.model';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}

const router = require('express').Router();

router.route('/').post(clientAuth, sendAuthResponseToClient);

export { router as authRouter, authenticate };
