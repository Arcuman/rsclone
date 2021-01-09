import CryptoJS from 'crypto-js';
import HttpStatus from 'http-status-codes';
import {  JWT_SECRET_KEY } from '@/config/config';
import { ErrorHandler } from './errorHandler';

const hashPassword =  (password:string) => CryptoJS.HmacSHA512(password,  JWT_SECRET_KEY).toString();

const checkPassword =  (password, hash) => {
  const currHash  = CryptoJS.HmacSHA512(password,  JWT_SECRET_KEY).toString();
  return currHash === hash;
};

export const myCrypt =  {
  hashPassword,
  checkPassword,
};

