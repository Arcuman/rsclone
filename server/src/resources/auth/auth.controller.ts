import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { webToken } from '@/helpers/webToken';
import { Cookie } from '@/types/types';
import { User } from '../users/user.model';
import { usersService } from '../users/user.controller';
import {
  ERR_LOGIN_MESSAGE,
  ERR_LOGOUT_MESSAGE,
  ERR_LOGIN_EXIST,
  AUTH_FORM_FIELDS,
  AUTH_FAILURE_REDIRECT_URL,
  AUTH_REFRESH_TOKEN,
  AUTH_REGISTER,
  AUTH_LOGOUT,
} from './constants';
import statusCodes from '../users/user.constants';
import { RefreshTokensAction, getNewRefreshToken, createCookieData } from './refreshToken';
import { AuthUser } from './auth.model';

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
/* eslint-disable  @typescript-eslint/no-explicit-any */
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: AUTH_FORM_FIELDS.usernameField,
      passwordField: AUTH_FORM_FIELDS.passwordField,
    },
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
// @typescript-eslint/no-explicit-any
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
    const userData = req.body;

    if (!userData.login || !userData.password) {
      throw new Error();
    }

    const userID = await usersService.setUser(userData);

    if (userID === 0) {
      res.status(ERR_LOGIN_EXIST.status).send(ERR_LOGIN_EXIST.message);
      return;
    }
    res.statusMessage = statusCodes[StatusCodes.OK].create;
    res.status(StatusCodes.OK).end();
  } catch (error) {
    const message: string = getReasonPhrase(StatusCodes.BAD_REQUEST);
    res.status(StatusCodes.BAD_REQUEST).send(`${message}`);
  }
};

const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authUser: AuthUser = await RefreshTokensAction(req);
    req.user = authUser.user;
    req.body = JSON.stringify({ token: authUser.token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
    return next(error);
  }
  return next();
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.login) {
      res.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
      return;
    }

    const user = await usersService.getUserByLogin(req.body.login);

    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).send(ERR_LOGOUT_MESSAGE);
    }
    await usersService.deleteSessionByUserId(user.user_id);

    res.cookie('refreshToken', '').status(StatusCodes.OK).send(getReasonPhrase(StatusCodes.OK));
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).send(getReasonPhrase(StatusCodes.BAD_REQUEST));
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

export const sendAuthResponseToClient = async (req: Request, res: Response): Promise<void> => {
  const userData = req.user!;

  let newRefreshToken = '';
  let forbiddenMessage = `${getReasonPhrase(StatusCodes.FORBIDDEN)}. ${ERR_LOGIN_MESSAGE}`;
  if (req.baseUrl === AUTH_REFRESH_TOKEN) {
    newRefreshToken = JSON.parse(req.body)?.token;
    forbiddenMessage = 'Bad token';
  }
  if (!userData) {
    res.status(StatusCodes.FORBIDDEN).send(forbiddenMessage);
    return;
  }
  const user = {
    user_id: userData.user_id,
    login: userData.login,
    name: userData.name,
  };
  const userId = user.user_id;
  const accessToken = webToken.createToken(user);

  if (!newRefreshToken || newRefreshToken === '') {
    newRefreshToken = await getNewRefreshToken(userId, req);
  }
  const cookies: Cookie = createCookieData(newRefreshToken);

  const body = JSON.stringify({
    user,
    accessToken,
  });

  res
    .cookie(cookies.name, cookies.value, cookies.options)
    .type('application/json')
    .json(body)
    .status(StatusCodes.OK)
    .end();
};
export { authenticate, authenticateLocal, clientAuth };
