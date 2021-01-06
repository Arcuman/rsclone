const router = require('express').Router();

const usersService = require('../users/user.service');
//const User = require('../users/user.model');

const { authenticate, authenticateLocal } = require('./auth.controller');

const webToken = require('../helpers/webToken');
const HttpStatus = require('http-status-codes');

router.route('/').post(authenticateLocal, async (req, res) => {
  if (!req.user) {
    res
      .status(HttpStatus.FORBIDDEN)
      .send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
  }
  const user = await usersService.getUserById(req.user._id);

  if (!user) {
    res
      .status(HttpStatus.FORBIDDEN)
      .send(HttpStatus.getStatusText(HttpStatus.FORBIDDEN));
  } else {
    const token = webToken.createToken(user);
    res.send({ user: User.toResponse(user), token });
  }
});

export { router as authRouter, authenticate };
