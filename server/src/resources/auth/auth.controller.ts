import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {User} from '../users/user.model';
import {usersService} from '../users/user.controller';
import {ERR_LOGIN_MESSAGE,AUTH_FORM_FIELDS,AUTH_FAILURE_REDIRECT_URL} from './constants';
import statusCodes from '../users/user.constants';

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

passport.use(
  new LocalStrategy(
    { usernameField: AUTH_FORM_FIELDS.usernameField, passwordField:AUTH_FORM_FIELDS.usernameField },
    async (username:string, password:string, done:any) => {
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
  new BearerStrategy(async (token:string, done:any) => {
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

const authenticate = (req:Request, res:Response, next:NextFunction) => {
  passport.authenticate('bearer', { session: false }, (err:string, user:User) => {
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

const authenticateLocal = (req:Request, res:Response, next:NextFunction) => {
  passport.authenticate(
    'local',
    {
      failureRedirect: AUTH_FAILURE_REDIRECT_URL,
      session: false,
    },
    (err:string, user:User) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.status(403).send(statusCodes[403]);
      }
      req.user = user;
      return next();
    },
  )(req, res, next);
};

export { authenticate, authenticateLocal };
