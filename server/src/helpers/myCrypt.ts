import CryptoJS from 'crypto-js';
import { JWT_SECRET_KEY } from '@/config/config';

const hashPassword = (password: string): string =>
  CryptoJS.HmacSHA512(password, JWT_SECRET_KEY!).toString();

const checkPassword = (password: string, hash: string): boolean => {
  const currHash = CryptoJS.HmacSHA512(password, JWT_SECRET_KEY!).toString();
  return currHash === hash;
};

export const myCrypt = {
  hashPassword,
  checkPassword,
};
