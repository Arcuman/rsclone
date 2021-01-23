import dotenv from 'dotenv';
import path from 'path';
import { ENV_NAME } from '@/constants/constants';

export const envPath = path.join(__dirname, ENV_NAME);

dotenv.config({
  path: envPath,
});

const { SALT, JWT_SECRET_KEY } = process.env;
const PORT = process.env.PORT || 3000;

export { SALT, JWT_SECRET_KEY, PORT };
