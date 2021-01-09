import { JWT_SECRET_KEY } from '../config/config';
import {User} from '../controllers/users/user.model';

const jwt = require('jsonwebtoken');

const getDataFromToken = async (token:string) => {
  const { user, login } = await jwt.verify(token, JWT_SECRET_KEY);
  return { user, login };
};

const createToken = (user:User) => {
  const payload = { user: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 1000 });
  return token;
};

export const webToken = {
  getDataFromToken,
  createToken,
};
