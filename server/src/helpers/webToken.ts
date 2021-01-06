const jwt = require('jsonwebtoken');
import { JWT_SECRET_KEY } from '../config/config';
import {UserProps} from '../models/user.model';

const getDataFromToken = async (token:string) => {
  const { user, login } = await jwt.verify(token, JWT_SECRET_KEY);
  return { user, login };
};

const createToken = (user:UserProps) => {
  const payload = { user: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 1000 });
  return token;
};

module.exports = {
  getDataFromToken,
  createToken,
};
