import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/config';
import {User} from '../controllers/users/user.model';

interface JwtData {
  user:number;
  login:string;

}
const getDataFromToken =  (token:string):number => {
  const decodeData = jwt.verify(token, JWT_SECRET_KEY!);
  // const {user} = JSON.parse(decodeData);
  console.log('dec=', decodeData);
  // return { user, login }
  return 8;
}
;

const createToken = (user:User):string => {
  const payload = { user: user.user_id, login: user.login };
  const token =  jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: 1000 });
  return token;
};

export const webToken = {
  getDataFromToken,
  createToken,
};
