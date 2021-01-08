import {UserProps} from '../users/user.model';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const usersService = require('../users/user.controller');
const statusCodes = require('../users/user.constants');

passport.use(
  new LocalStrategy(
    { usernameField: 'login', passwordField: 'password' },
    async (username:string, password:string, done:any) => {
      try {
        const user = await usersService.checkUserAuth(username, password);
        if (!user) {
          return done(null, false, {
            message: 'Bad login/password combination',
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
  new BearerStrategy(async (token:any, done:any) => {
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

const authenticate = (req:any, res:any, next:any) => {
  passport.authenticate('bearer', { session: false }, (err:string, user:UserProps) => {
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

const authenticateLocal = (req:any, res:any, next:any) => {
  passport.authenticate(
    'local',
    {
      failureRedirect: '/login',
      session: false,
    },
    (err:any, user:UserProps) => {
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

module.exports = { authenticate, authenticateLocal };
