import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { StatusCodes, getReasonPhrase} from 'http-status-codes';
import {webToken} from '@/helpers/webToken';
import {Cookie} from '@/types/types';
import { User } from '../users/user.model';
import { usersService } from '../users/user.controller';
import { ERR_LOGIN_MESSAGE, AUTH_FORM_FIELDS, AUTH_FAILURE_REDIRECT_URL, AUTH_REFRESH_TOKEN, AUTH_REGISTER, AUTH_LOGOUT } from './constants';
import statusCodes from '../users/user.constants';
import {RefreshTokensAction, getNewRefreshToken, createCookieData} from './refreshToken';
import {AuthUser} from './auth.model';

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(
  'local',
  new LocalStrategy(
    { usernameField: AUTH_FORM_FIELDS.usernameField, passwordField: AUTH_FORM_FIELDS.passwordField },
    async (username: string, password: string, done: any) => {
      try {
        const user = await usersService.checkUserAuth(username, password);
     
        if (!user) {
          return done(null, false, {
            message: ERR_LOGIN_MESSAGE,
          });
        }

        return done(null, user);

      } catch (error) {
        return done(null, false);
      }
    },
  ),
);

passport.use(
  'bearer',
  new BearerStrategy(async (token: string, done: any) => {
    if (!token) {
      return done(null, false);
    }
    try {
      const user = await usersService.findOneByToken(token);
      if (!user) {
        return done(null, false);
      }
      return done(null, user, { scope: 'all' });
    } catch (error) {
      return done(null, false);
    }
  }),
);

const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('bearer', { session: false }, (err: string, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send(statusCodes[401]);
    }
    req.user = user;

    return next();
  })(req, res, next);
};

const authenticateLocal = (req: Request, res: Response, next: NextFunction): void => {
  
  passport.authenticate(
    'local',
    {
      failureRedirect: AUTH_FAILURE_REDIRECT_URL,
      session: false,
    },
    (err: string, user: User) => {
      if (err) {
        return next(err);
      }
     
      if (!user) {
        return next();
      }
      req.user = user;
      return next();
    },
  )(req, res, next);
};

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userID = await usersService.setUser(req.body);
    if (userID===0){
      throw new Error();
    }
    res.statusMessage = statusCodes[StatusCodes.OK].create;
    res
      .status(StatusCodes.OK)
      .end();
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }
  
};

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authUser:AuthUser = await RefreshTokensAction(req);

    req.user = authUser.user;
    req.body =  JSON.stringify({token:authUser.token});
  } catch (error) {
    res.statusMessage = statusCodes[StatusCodes.BAD_REQUEST];
    
    res
      .status(StatusCodes.BAD_REQUEST)
      .end();
    return next(error);
  }
  return next();
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await usersService.getUserByLogin(req.body.login);

    if (!user){
      throw new Error();
    }
    await usersService.deleteSessionByUserId(user.user_id);
   
    res
      .cookie('refreshToken', '')
      .status(StatusCodes.OK)
      .send( getReasonPhrase(StatusCodes.OK));
      
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }

};

const clientAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.baseUrl === AUTH_REGISTER) {
    registerUser(req, res);
  } else if (req.baseUrl === AUTH_REFRESH_TOKEN) {
    refreshToken(req, res, next);
  } else if (req.baseUrl === AUTH_LOGOUT) {
    logoutUser(req, res);    
  } else {
    authenticateLocal(req, res, next);
  }

};

export const sendAuthResponseToClient =  async (req:Request, res:Response):Promise<void>=> {
  const userData = req.user!;

  if (!userData) {
    res
      .status(StatusCodes.FORBIDDEN)
      .send(getReasonPhrase(StatusCodes.FORBIDDEN));
    return;
  }
  
  let newRefreshToken =  req.baseUrl === '/refresh-tokens' ? JSON.parse(req.body)?.token : '';
  
  const userId = userData.user_id;
  const user = await usersService.getUserById(userId);

  if (!user) {
    res
      .status(StatusCodes.FORBIDDEN)
      .send(getReasonPhrase(StatusCodes.FORBIDDEN));
    return;
  }

  const accessToken = webToken.createToken(user);
  if (!newRefreshToken || newRefreshToken===''){
    newRefreshToken =  await getNewRefreshToken(userId, req);
  }
  const cookies:Cookie = createCookieData(newRefreshToken);
   
  const body = JSON.stringify({
    user, 
    accessToken,
    refreshToken:newRefreshToken,
  });
   
  res
    .cookie(cookies.name, cookies.value, cookies.options)
    .type('application/json')
    .json(body)      
    .status(StatusCodes.OK)
    .end();
  
};
export { authenticate, authenticateLocal, clientAuth };
